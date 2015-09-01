#####################
Tutorial: Axis Viewer
#####################

The Axis Viewer is a very simple Zinc application written in Python with a Qt user interface. It sets up a Zinc scene containing only graphics showing 3-D axes, and renders them in the window using a simplified version of the Zinc Widget which allows interactive rotation, panning and zooming of the scene.

.. figure:: axis_viewer.png
  :align: center
  :width: 636px
  :height: 471px

This tutorial has two goals:

1. Set up a minimal graphical application using the Zinc in Python with a Qt user interface.
2. For those interested, explain how the Zinc Widget works, including set up, drawing graphics and handling mouse input.

In addition, it also discussions differences between using the two different Python bindings to Qt: PySide and PyQt4.

The souce code used in this tutorial is available from the `physiome
project svn server <https://svn.physiomeproject.org/svn/cmiss/zinc/bindings/examples/trunk/python/axis_viewer/>`_.

Creating the User Interface with Qt
===================================

The user interface for this example consists of a window with a graphical rendering area with a Quit button below, as shown in the above figure. It is defined in the axis_viewer.ui file, created in Qt Designer as shown below.

.. figure:: axis_viewer_qtdesigner.png
  :align: center

The AxisViewerDlg is the class for this application, and is based on a QWidget. It includes three other widgets, a ZincWidget for the graphical display area, a spacer and the Quit button. We can see in this example that the clicked() signal (event) from the Quit button triggers the close() slot (function) on the AxisViewerDlg class; in this case close() is handled by the base QWidget class, but as your user interface grows you will connect signals from other widgets to new slots on your classes, which you must implement as class methods.

The ZincWidget is a custom Qt widget made specifically for use with PyZinc. Qt Designer allows the use of custom widgets by 'promoting' them from a specified Qt base class (here QWidget) to a derived class name. It requires the 'header file' declaring the derived widget class to be specified, here 'zincwidget.h' as appropriate to C++, however Qt on Python will look for the definition of the derived widget class in 'zincwidget.py'. For more information on promoting widgets in Qt Designer read the document at this location http://qt-project.org/doc/qt-4.8/designer-using-custom-widgets.html.

The UI description is converted to a python module using a Python Qt UI compiler.::

   # PySide
   pyside-uic -o axis_viewer_ui_pyside.py axis_viewer.ui
   # PyQt4
   pyuic4 -o axis_viewer_ui_pyqt4.py axis_viewer.ui
   
add '--from-imports' if targeting Python 3.0 or later in the above command.

**Note:**
 
 This example uses either PySide or PyQt4 depending on which one it successfully imports.  These two different Python bindings for the Qt libraries are, for this simple example, interchangeable.  However this is not always the case for more complicated applications.  This web page shows the differences 
 between the two http://qt-project.org/wiki/Differences_Between_PySide_and_PyQt. The two bindings differ in license: PySide (LGPL) vs. PyQt4 (GPL/commercial).

We also set an application icon here which is defined in a resource file
using qt-designer and compiled into a python resource using a Python Qt resource compiler.::

   # PySide
   pyside-rcc -py3 -o icons_rc.py icons.qrc
   # PyQt4
   pyrcc4 -py3 -o icons_rc.py icons.qrc

The implementation of the Zinc Widget in file zincwidget.py is explained later.

Creating the Application
========================

The Entry Point
---------------

When executing axis_viewer.py directly (i.e. not imported as a module) the __name__ variable is set to '__main__'. The axis viewer detects this and invokes the function main(sys.argv), which mimics the entry point for C/C++ programs. The main() function initialises the application-wide resources and starts the event loop:

.. literalinclude:: axis_viewer.py
  :linenos:
  :start-after: # main start
  :end-before: # main end

On line 7 we create a QApplication object which controls the main flow of the program.  Among other things
it also contains the main event loop.  An application has **precisely** one QApplication object.  After this we create 
an instance of the AxisViewerDlg (line 9).  The AxisViewerDlg is the visual element in the GUI and defines the main 
window of the application.  Next we show the main window (line 10) and then start the execution of the main event loop (line 12).
The event loop handles the events that are generated when the program is running.  Examples of events are mouse presses and 
key strokes.

The Axis Viewer Dialog class
----------------------------

The AxisViewerDlg class, derived from QWidget is where your application-specific code goes. Since we wish to use Zinc, we first need to import OpenCMISS-Zinc modules:

.. literalinclude:: axis_viewer.py
  :linenos:
  :start-after: # opencmiss.zinc.imports start
  :end-before: # opencmiss.zinc.imports end

Each application using Zinc must create a Zinc 'Context' object so that module must always be imported. You don't need to import modules for objects created from the Context, but enumerations such as the
glyph shape type are only defined in their module, hence they must be imported as above.

The AxisViewerDlg class defines the code that is special to your application, and this includes setting up a few things specific to Zinc:

.. literalinclude:: axis_viewer.py
  :linenos:
  :start-after: # AxisViewerDlg start
  :end-before: # AxisViewerDlg end

After initialising the base class the first thing we do is create a Zinc Context object and store it in a member variable.

note::

  We use the context to create all other Zinc objects either directly or indirectly.

We keep a handle to this context until we are no longer using objects obtained from it (either directly or indirectly).  
If we don't all the resources associated with the context will be released and any new actions performed on objects from 
the context will be invalid resulting in undefined behaviour.  This means that the Zinc context handle should be the last 
handle we let go of. Most users will want to define standard materials and glyphs for their later visualisations, as is done here.

Following creation of the Zinc context we create the UI from the python module created from the Qt UI compiler. This creates a Zinc Widget, however we must immediately pass it the Zinc Context so it can complete its initialisation when its initializeGL() method is called as the window is shown.

The setupAxes() method of the AxisViewerDlg class sets up the simple graphics specific to this Zinc application, namely a visualisation of the origin point with unit-sized 3-D axes:

.. literalinclude:: axis_viewer.py
  :linenos:
  :start-after: # AxisViewerDlg.setupAxes start
  :end-before: # AxisViewerDlg.setupAxes end

New 'Points' Graphics default to the special single 'point' domain. To create points for any other domains you need to call graphics.setFieldDomainType(Field.DOMAIN_TYPE_NODES) or similar, which requires the OpenCMISS-Zinc 'Field' module to be imported.

The single point domain with Points graphics is unique in that it doesn't require a coordinate field to be specified, since it defaults to the origin (0,0,0). All other graphics require a coordinate field defined over the relevant domain to be set via graphics.setCoordinateField(coordinate_field).

In some cases you'll want to show a subset of the domain. Do this by setting the subgroup field to a
Group or any other Boolean-valued field (where non-zero == True == show) with graphics.setSubgroupField(subgroup_field).
        
The glyph specifies a 3-D graphical object to draw at every point in the points graphics, here just the origin of the coordinate system. The default glyph is a single point/pixel, but we wish to show solid axes so rotating and zooming the window has a more visible effect. The glyph is set in the 'graphics point attributes', and can be set by 'glyph shape type' or by object, e.g. found by name in the Glyphmodule.

Implementation of the Zinc Widget
=================================

Rendering
---------

The ZincWidget class is derived from the QGLWidget. QGLWidget is a widget for rendering OpenGL graphics, and is responsible for setting up the OpenGL context that the Zinc library draws into. The Zinc Widget creates a Zinc Sceneviewer which manages the viewing parameters for the scene and can render it into the current OpenGL context.

This example includes a simplified Zinc Widget which only handles rotating, panning and zooming the scene,
and the following explains how it works. For your own code we recommend you take the more powerful version from `here <https://github.com/OpenCMISS-Zinc/ZincPythonUtilities/>`_.

In the initialisation of the ZincWidget class we call __init__ of the super class QGLWidget. In order to use the
Zinc Widget, the application must pass the Context to it using the setContext() method; see the
AxisViewerDlg class __init__ method above.

In the initializeGL() method we create a Zinc scene viewer which keeps track of the current scene and view direction, angle and other parameters for viewing it.

.. literalinclude:: zinc_widget.py
  :linenos:
  :start-after: # initializeGL start
  :end-before: # initializeGL end
  
This function is called once before resizeGL() or paintGL() is called.

The resizeGL() and paintGL() are very simple functions and are given here:

.. literalinclude:: zinc_widget.py
  :linenos:
  :start-after: # paintGL start
  :end-before: # paintGL end
  
We can see here in paintGL(), on line 8, that we simply need to tell the scene viewer to render the scene.

.. literalinclude:: zinc_widget.py
  :linenos:
  :start-after: # resizeGL start
  :end-before: # resizeGL end
  
Line 5 shows how a resize event is passed through to the scene viewer, here we tell the scene viewer the new viewport size.

.. literalinclude:: zinc_widget.py
  :linenos:
  :start-after: # _zincCallback start
  :end-before: # _zincCallback end

The above code snippet shows the callback received by the ZincWidget from Zinc when the scene viewer has changed. If the change affects the view, redraw.

Handling Mouse Interaction
--------------------------

In visualising a 3D scene it is helpful to be able to change the view point to see objects that are hidden or occluded.  It is also
helpful to be able to change the view point to understand how objects relate to each other in the scene.  The Zinc library scene viewer
has a default handler for manipulating the view point of the scene which we can utilise. The default input handler allows the user to 
rotate, translate, magnify, and miniaturise the scene. 

To use the built-in handler we must create a 'Sceneviewerinput' object and set the event position,
input type, mouse button and event modifiers.  We need to convert the widget specific mouse button identifier to
the scene viewer input mouse button identifier.  An efficient way of doing this is to create a map from the widget
set mouse buttons to the scene viewer input mouse buttons.  We also need to create a map from the widget set event 
modifiers to the scene viewer input modifiers.  For PySide and PyQt4 we can use the following code.

.. literalinclude:: zinc_widget.py
  :linenos:
  :start-after: # mapping from qt to zinc start
  :end-before: # mapping from qt to zinc end

For the default input handler the left mouse button will rotate the scene, the middle mouse button will translate/pan the scene, the 
right mouse button moves the viewer towards or away from the current interest point in the scene (which looks best in perspective mode, and clips when you get too close). Holding down the shift key with the right mouse button drag magnifies or miniaturises the scene, just like a camera zoom lens.

The mousePressEvent(), mouseReleaseEvent(), and mouseMoveEvent() functions utilise the default input handler by calling the scene viewer 
processSceneviewerinput() API function.  Note that we don't need to manually redraw the graphics here; the changes to the view made by processSceneviewerinput() trigger a callback to _zincCallback(), described earlier.


