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
from opencmiss.zinc.glyph import Glyph
from opencmiss.zinc.sceneviewerinput import Sceneviewerinput
from opencmiss.zinc.sceneviewer import Sceneviewer, Sceneviewerevent

# mapping from qt to zinc start
# Create a button map of Qt mouse buttons to Zinc input buttons
button_map = {QtCore.Qt.LeftButton: Sceneviewerinput.BUTTON_TYPE_LEFT, QtCore.Qt.MidButton: Sceneviewerinput.BUTTON_TYPE_MIDDLE, QtCore.Qt.RightButton: Sceneviewerinput.BUTTON_TYPE_RIGHT}
# Create a modifier map of Qt modifier keys to Zinc modifier keys
def modifier_map(qt_modifiers):
    '''
    Return a Zinc SceneViewerInput modifiers object that is created from
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
        # Initialise Zinc context and scene viewer members
        # context must be passed in by application before initializeGL is called
        self._context = None
        self._scene_viewer = None
        # init end

    def setContext(self, context):
        '''
        Sets the context for this ZincWidget.  This should be set before the initializeGL()
        method is called otherwise the scene viewer cannot be created.
        '''
        self._context = context

    def getContext(self):
        if not self._context is None:
            return self._context
        else:
            raise RuntimeError("Zinc context has not been set.")

    # initializeGL start
    def initializeGL(self):
        '''
        Set up the Zinc Sceneviewer.  
        '''

        # From the graphics module get the scene viewer module.
        scene_viewer_module = self._context.getSceneviewermodule()
        
        # From the scene viewer module we can create a scene viewer, we set up the 
        # scene viewer to have the same OpenGL properties as the QGLWidget.
        self._scene_viewer = scene_viewer_module.createSceneviewer(Sceneviewer.BUFFERING_MODE_DOUBLE, Sceneviewer.STEREO_MODE_DEFAULT)

        # default to showing the root region scene
        root_region = self._context.getDefaultRegion()
        scene = root_region.getScene()
        self._scene_viewer.setScene(scene)

        # New scene viewers use the default scene filter which is initially
        # by scene and graphics visibility flags. Can set a different filter
        # with the following, or set no filter to show all graphics:
        #self._scene_viewer.setScenefilter(scene_filter)
        
        # Set the zinc callback so that we are informed of changes to the scene
        self._scene_viewer_notifier = self._scene_viewer.createSceneviewernotifier()
        self._scene_viewer_notifier.setCallback(self._zincCallback)
       
        # initializeGL end
        
    # _zincCallback start
    def _zincCallback(self, event):
        '''
        Receive callbacks from zinc about changes that effect this scene view.
        For changes that require a repaint we call the updateGL method to redraw
        the scene.
        '''
        if event.getChangeFlags() & Sceneviewerevent.CHANGE_FLAG_REPAINT_REQUIRED:
            self.updateGL()
        # _zincCallback end
        
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
        

