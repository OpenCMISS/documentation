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
from opencmiss.zinc.graphics import Graphics
from opencmiss.zinc.sceneviewer import Sceneviewer
from opencmiss.zinc.element import Element, Elementbasis
from opencmiss.zinc.material import Material
from opencmiss.zinc.sceneviewerinput import Sceneviewerinput

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
        self._regions = []
        # init end

    # initializeGL start
    def initializeGL(self):
        '''
        Initialise the Zinc scene, create the finite element, and the surface to visualise it.  
        '''
        
        # Get the default region to create a point in.
        default_region = self._context.getDefaultRegion()
              
        # Get the graphics material module from the graphics module and define PyZincs' standard materials
        material_module = self._context.getMaterialmodule()
        material_module.defineStandardMaterials()

        # From the graphics module get the scene viewer module.
        scene_viewer_module = self._context.getSceneviewermodule()
        
        # From the scene viewer module we can create a scene viewer, we set up the 
        # scene viewer to have the same OpenGL properties as the QGLWidget.
        self._scene_viewer = scene_viewer_module.createSceneviewer(Sceneviewer.BUFFERING_MODE_DOUBLE, Sceneviewer.STEREO_MODE_DEFAULT)

        # Get the filter module from the graphics module and create a filter for the visibility flags.
        # The default visibility filter is to show all graphic items.
        filter_module = self._context.getScenefiltermodule()
        graphics_filter = filter_module.createScenefilterVisibilityFlags()
        # Set the visibility filter on the scene viewer.  A different scene viewer could have a different visibility 
        # filter applied to it.
        self._scene_viewer.setScenefilter(graphics_filter)
        
        # childRegionCreate start
        # create five regions
        for i in range(1, 6):
            region_name = 'region_' + str(i)
            region = default_region.createChild(region_name)
            self._regions.append(region)
            # childRegionCreate end
            
        # Get the scene for the default region and set this as the scene for the 
        # scene viewer to show.
        scene = default_region.getScene()
        self._scene_viewer.setScene(scene)
            
        self.createMaterial()
        self.createMaterialUsingImageField()
        self.createFiniteElements()
        self.createSurfaceGraphics()

        # Place the viewport to contain everything visible in the scene.
        self._scene_viewer.viewAll()
        # initializeGL end
        
    # createMaterialUsingImageField start
    def createMaterialUsingImageField(self):
        '''
        Create a material using an image.  Here we show how to make a material 
        from an image on disk.  Using an image field and a material creates an
        OpenGL texture which is very efficient for visualising 2D/3D images/image stacks.
        '''
        material_module = self._context.getMaterialmodule()
        material = material_module.createMaterial()
        material.setName('texture')
        material.setManaged(True)
        
        # The filename of the image to use for the material 
        image_name = 'picture.png'
        # Get a handle to the default region
        default_region = self._context.getDefaultRegion()
        
        # The field module allows us to create a field image to 
        # store the image data into.
        field_module = default_region.getFieldmodule()
        
        # Create an image field, we don't specify the domain here for this
        # field even though it is a source field.  A temporary xi source field
        # is created for us.
        image_field = field_module.createFieldImage()
        image_field.setName('texture')
        
        # Create a stream information object that we can use to read the 
        # image file from disk
        stream_information = image_field.createStreaminformationImage()
        stream_information.setFileFormat(stream_information.FILE_FORMAT_PNG)
        # We are reading in a file from the local disk so our resource is a file.
        stream_information.createStreamresourceFile(image_name)
        
        # Actually read in the image file into the image field.
        image_field.read(stream_information)
        
        material.setTextureField(1, image_field)
        # createMaterialUsingImageField end
        
    # createMaterial start
    def createMaterial(self):
        '''
        Define a yellow material from first principles.  We can create proprietary materials
        if the standard materials do not meet our needs.  A proprietary material can be defined  
        with any of the following attributes:
          - ATTRIBUTE_ALPHA
          - ATTRIBUTE_AMBIENT
          - ATTRIBUTE_DIFFUSE
          - ATTRIBUTE_EMISSION
          - ATTRIBUTE_SHININESS
          - ATTRIBUTE_SPECULAR
          
        By giving our material a unique name from other materials we can use the material module
        to get a handle to it at a later time.  Further if we set the managed flag the material
        module will manage the lifetime of the material for us.
        '''
        material_module = self._context.getMaterialmodule()
        material = material_module.createMaterial()
        material.setName('myyellow')
        material.setManaged(True)
        material.setAttributeReal3(Material.ATTRIBUTE_AMBIENT, [0.9, 0.9, 0.0])
        material.setAttributeReal3(Material.ATTRIBUTE_DIFFUSE, [0.9, 0.9, 0.0])
        # createMaterial end

    # createSurfaceGraphics start
    def createSurfaceGraphics(self):
        '''
        Create the surface graphics using the finite element field 'coordinates'.
        For each region we set a different material to the surface created.  The 'texture'
        material uses the finite elements xi field as a texture coordinate field.
        '''
        material_module = self._context.getMaterialmodule()
        material_names = ['red', 'green', 'blue', 'myyellow', 'texture']
        for i, region in enumerate(self._regions):
            scene = region.getScene()
            field_module = region.getFieldmodule()
            material = material_module.findMaterialByName(material_names[i])
        
            # We use the beginChange and endChange to wrap any immediate changes this will
            # streamline the rendering of the scene.
            scene.beginChange()
            
            surface = scene.createGraphicsSurfaces()
            finite_element_field = field_module.findFieldByName('coordinates')
            surface.setCoordinateField(finite_element_field)
            surface.setMaterial(material)
            if material_names[i] == 'texture':
                xi_field = field_module.findFieldByName('xi')
                surface.setTextureCoordinateField(xi_field)
            
            # Let the scene render the scene.
            scene.endChange()
            # createSurfaceGraphics end
        
    def create2DFiniteElement(self, field_module, finite_element_field, node_coordinates):
        '''
        Create a 2D finite element from the field_module, finite_element_field and node_coordinates.
        '''
        # Find a special node set named 'cmiss_nodes'
        nodeset = field_module.findNodesetByName('nodes')
        node_template = nodeset.createNodetemplate()
        
        # Set the finite element coordinate field for the nodes to use
        node_template.defineField(finite_element_field)
        
        
        field_cache = field_module.createFieldcache()
        
        node_identifiers = []
        # Create four nodes to define a square finite element over
        for node_coordinate in node_coordinates:
            # Node indexes start from 1
            node = nodeset.createNode(-1, node_template)
            node_identifiers.append(node.getIdentifier())
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
                    
        for i, node_identifier in enumerate(node_identifiers):
            node = nodeset.findNodeByIdentifier(node_identifier)
            element_template.setNode(i+1, node)

        mesh.defineElement(-1, element_template)
    
    # createFiniteElements start
    def createFiniteElements(self):
        '''
        Create the finite elements for the graphic surfaces to be created over.  This helper
        method creates a number of regions with a 2D finite element in locations defined by the 
        node_coordinate_set and creating a 'coordinate' field named 'coordinates.
        '''
        node_coordinate_set = [[[0, 0], [1, 0], [0, 1], [1, 1]],
                               [[1.2, 0], [2.2, 0], [1.2, 1], [2.2, 1]],
                               [[0, 1.2], [1, 1.2], [0, 2.2], [1, 2.2]],
                               [[1.2, 1.2], [2.2, 1.2], [1.2, 2.2], [2.2, 2.2]],
                               [[2.4, 0], [4.4, 0], [2.4, 2.2], [4.4, 2.2]]]
        
        for i, region in enumerate(self._regions):
            field_module = region.getFieldmodule()
            field_module.beginChange()
            field_name = 'coordinates'
            # Create a finite element field with 2 components to represent 2 dimensions
            finite_element_field = field_module.createFieldFiniteElement(2)
            # Set the name of the field, we give it label to help us understand it's purpose
            finite_element_field.setName(field_name)
            # Set the is managed flag to true so the field module will manage the field for us
            finite_element_field.setManaged(True)
        
            self.create2DFiniteElement(field_module, finite_element_field, node_coordinate_set[i])
            field_module.endChange()
        # createFiniteElements end
        
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
        
        # The viewport has been changed so update the OpenGL scene.
        self.updateGL()


