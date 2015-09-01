"""
PyZinc examples

This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
"""

try:
    from PySide import QtCore, QtOpenGL
except ImportError:
    from PyQt4 import QtCore, QtOpenGL
    
from opencmiss.zinc.context import Context
from opencmiss.zinc.sceneviewer import Sceneviewer, Sceneviewernotifier, Sceneviewerevent
from opencmiss.zinc.sceneviewerinput import Sceneviewerinput
from opencmiss.zinc.field import Field
from opencmiss.zinc.element import Element, Elementbasis
from opencmiss.zinc.scenepicker import Scenepicker
import opencmiss.zinc.scenecoordinatesystem
from opencmiss.zinc.glyph import Glyph

# mapping from qt to zinc start
# Create a button map of Qt mouse buttons to Zinc input buttons
button_map = {QtCore.Qt.LeftButton: Sceneviewerinput.BUTTON_TYPE_LEFT, QtCore.Qt.MidButton: Sceneviewerinput.BUTTON_TYPE_MIDDLE, QtCore.Qt.RightButton: Sceneviewerinput.BUTTON_TYPE_RIGHT}
# Create a modifier map of Qt modifier keys to Zinc modifier keys
def modifier_map(qt_modifiers):
    '''
    Return a Zinc Sceneviewerinput modifiers object that is created from
    the Qt modifier flags passed in.
    '''
    modifiers = Sceneviewerinput.MODIFIER_FLAG_NONE
    if qt_modifiers & QtCore.Qt.SHIFT:
        modifiers = modifiers | Sceneviewerinput.MODIFIER_FLAG_SHIFT
    
    return modifiers
# mapping from qt to zinc end



class ZincWidget(QtOpenGL.QGLWidget):
    
    def sceneviewerEvent(self, event):
        if event.getChangeFlags() & Sceneviewerevent.CHANGE_FLAG_REPAINT_REQUIRED:
            self.updateGL()
        return None

    
    # init start
    def __init__(self, parent = None):
        '''
        Call the super class init functions, create a Zinc context and set the scene viewer handle to None.
        '''
        
        QtOpenGL.QGLWidget.__init__(self, parent)
        # Create a Zinc context from which all other objects can be derived either directly or indirectly.
        # Each context requires a unique name to reference it.
        self._context = Context("finiteelementcreation")
        self._scene_viewer = None
        # init end
        
    # initializeGL start
    def initializeGL(self):
        '''
        Initialise the Zinc scene, create the finite element, and the surface to visualise it.  
        '''
               
        # From the graphics module get the scene viewer module.
        scene_viewer_module = self._context.getSceneviewermodule()
        
        # Get the glyph module from the graphics module and define the standard glyphs
        glyph_module = self._context.getGlyphmodule()
        glyph_module.defineStandardGlyphs()

        # From the scene viewer package we can create a scene viewer, we set up the scene viewer to have the same OpenGL properties as
        # the QGLWidget.
        self._scene_viewer = scene_viewer_module.createSceneviewer(Sceneviewer.BUFFERING_MODE_DOUBLE, Sceneviewer.STEREO_MODE_DEFAULT)

        # Create a filter for visibility flags which will allow us to see our graphics.
        filter_module = self._context.getScenefiltermodule()
        graphics_filter = filter_module.createScenefilterVisibilityFlags()

        # Set the filter for the scene viewer to use.
        self._scene_viewer.setScenefilter(graphics_filter)
        
        self.create2DFiniteElement()
        self.createSurfaceGraphic()

        # Place the viewport to contain everything visible in the scene.
        self._scene_viewer.viewAll()
        self._notifier = self._scene_viewer.createSceneviewernotifier()
        self._notifier.setCallback(self.sceneviewerEvent)
        # initializeGL end
        
    # createSurfaceGraphic start
    def createSurfaceGraphic(self):
        
        # Get a the root region to create the point in.  Every context has a default region called the root region.
        default_region = self._context.getDefaultRegion()

        
        # Get the scene for the default region to create the visualisation in.
        scene = default_region.getScene()
        
        # We use the beginChange and endChange to wrap any immediate changes and will
        # streamline the rendering of the scene.
        scene.beginChange()
                
        # createSurfaceGraphic graphic start
        field_module = default_region.getFieldmodule()
        finite_element_field = field_module.findFieldByName('coordinates')
        # Create a surface graphic and set it's coordinate field to the finite element coordinate field
        # named coordinates
        surface = scene.createGraphicsSurfaces()
        surface.setCoordinateField(finite_element_field)
        
        # Create point graphics and set the coordinate field to the finite element coordinate field
        # named coordinates
        sphere = scene.createGraphicsPoints()
        sphere.setCoordinateField(finite_element_field)
        sphere.setFieldDomainType(Field.DOMAIN_TYPE_NODES)
        att = sphere.getGraphicspointattributes()
        att.setGlyphShapeType(Glyph.SHAPE_TYPE_SPHERE)
        att.setBaseSize([1])
        # createSurfaceGraphic graphic end
        
        # Set the scene to our scene viewer.
        self._scene_viewer.setScene(scene)
        # Let the scene render the scene.
        scene.endChange()
        # createSurfaceGraphic end
        
    # create2DFiniteElement start
    def create2DFiniteElement(self):
        # Get a the root region, which is the default region of the context.
        default_region = self._context.getDefaultRegion()
        
        # Get the field module for root region, with which we  shall create a 
        # finite element coordinate field.
        field_module = default_region.getFieldmodule()
        
        field_module.beginChange()
        
        # Create a finite element field with 2 components to represent 2 dimensions
        finite_element_field = field_module.createFieldFiniteElement(2)
        # Set the name of the field, we give it label to help us understand it's purpose
        finite_element_field.setName('coordinates')
        self._finite_element_field = finite_element_field
        # Find a special node set named 'cmiss_nodes'
        nodeset = field_module.findNodesetByName('nodes')
        node_template = nodeset.createNodetemplate()
        # Set the finite element coordinate field for the nodes to use
        node_template.defineField(finite_element_field)
        
        field_cache = field_module.createFieldcache()
        
        # The node template for the square expects the nodes to be ordered in 
        # a mirrored Z - pattern for the square element.  The order of the coordinates
        # for the nodes is unimportant here but it will allow us to index the nodes in
        # order later when using the element template.
        node_coordinates = [[0, 0.0], [3.0, 0.0], [0.0, 4.0], [2.0, 2.0]]
        # Create four nodes to define a square finite element over
        for i, node_coordinate in enumerate(node_coordinates):
            # Node indexes start from 1
            node = nodeset.createNode(i+1, node_template)
            # Set the node coordinates, first set the field cache to use the current node
            field_cache.setNode(node)
            # Pass in floats as an array
            finite_element_field.assignReal(field_cache, node_coordinate)

        # We want to create a 2D element so we grab the predefined 2D mesh.  Currently there
        # is only one mesh for each dimension 1D, 2D, and 3D the user is not able to name
        # their own mesh.  This is due to change in an upcoming release of PyZinc.
        mesh = field_module.findMeshByDimension(2)
        element_template = mesh.createElementtemplate()
        element_template.setElementShapeType(Element.SHAPE_TYPE_SQUARE)
        element_node_count = 4
        element_template.setNumberOfNodes(element_node_count)
        # Specify the dimension and the interpolation function for the element basis function. 
        linear_basis = field_module.createElementbasis(2, Elementbasis.FUNCTION_TYPE_LINEAR_LAGRANGE)
        # The indexes of the nodes in the node template we want to use
        node_indexes = [1, 2, 3, 4]
        # Define a nodally interpolated element field or field component in the
        # element_template. Only Lagrange, simplex and constant basis function types
        # may be used with this function, i.e. where only a simple node value is
        # mapped. Shape must be set before calling this function.  The -1 for the component number
        # defines all components with identical basis and nodal mappings.
        element_template.defineFieldSimpleNodal(finite_element_field, -1, linear_basis, node_indexes)
                    
        for i in range(element_node_count):
            node = nodeset.findNodeByIdentifier(i+1)
            element_template.setNode(i+1, node)

        mesh.defineElement(-1, element_template)
        
        field_module.endChange()
        # create2DFiniteElement end
        
    # paintGL start
    def paintGL(self):
        '''
        Render the scene for this scene viewer.  The QGLWidget has already set up the
        correct OpenGL buffer for us so all we need do is render into it.  The scene viewer
        will clear the background so any OpenGL drawing of your own needs to go after this
        API call.
        '''
        self._scene_viewer.renderScene()
        # paintGL end

    # resizeGL start
    def resizeGL(self, width, height):
        '''
        Respond to widget resize events.
        '''
        self._scene_viewer.setViewportSize(width, height)
        # resizeGL end

    def mousePressEvent(self, mouseevent):
        '''
        Inform the scene viewer of a mouse press event.
        '''
        scene_input = self._scene_viewer.createSceneviewerinput()
        scene_input.setPosition(mouseevent.x(), mouseevent.y())
        scene_input.setEventType(Sceneviewerinput.EVENT_TYPE_BUTTON_PRESS)
        scene_input.setButtonType(button_map[mouseevent.button()])
        scene_input.setModifierFlags(modifier_map(mouseevent.modifiers()))
        self._scene_viewer.processSceneviewerinput(scene_input)
        
    def mouseReleaseEvent(self, mouseevent):
        '''
        Inform the scene viewer of a mouse release event.
        '''
        scene_input = self._scene_viewer.createSceneviewerinput()
        scene_input.setPosition(mouseevent.x(), mouseevent.y())
        scene_input.setEventType(Sceneviewerinput.EVENT_TYPE_BUTTON_RELEASE)
        scene_input.setButtonType(button_map[mouseevent.button()])
            
        self._scene_viewer.processSceneviewerinput(scene_input)
        
    def mouseMoveEvent(self, mouseevent):
        '''
        Inform the scene viewer of a mouse move event and update the OpenGL scene to reflect this
        change to the viewport.
        '''
        scene_input = self._scene_viewer.createSceneviewerinput()
        scene_input.setPosition(mouseevent.x(), mouseevent.y())
        scene_input.setEventType(Sceneviewerinput.EVENT_TYPE_MOTION_NOTIFY)
        if mouseevent.type() == QtCore.QEvent.Leave:
            scene_input.setPosition(-1, -1)
        
        self._scene_viewer.processSceneviewerinput(scene_input)


