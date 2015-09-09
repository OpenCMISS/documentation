
##############################
Tutorial: Read and View a Mesh
##############################

This example loads a deforming heart model and allows you to vary time with a slider to animate its deformation. You can rotate, pan and zoom the model in the window using the same controls as the Cmgui application (which uses Zinc under the hood!).

It uses the `Zinc Widget <https://github.com/OpenCMISS-Zinc/ZincPythonUtilities/>`_ which takes care of graphics rendering so you only need to take care of the parts that are special to your application.

Topics which this example show include:

* Setting up the Zinc Context
* Configuring the Zinc Widget
* Reading a time-varying model from EX files using a stream information object
* Making surface and points graphics.

The souce code used in this tutorial is available from the `physiome
project svn server <https://svn.physiomeproject.org/svn/cmiss/zinc/bindings/examples/trunk/python/read_mesh/>`_.

.. figure:: read_mesh.png
  :align: center

Overview
========

This example comes with a Qt user interface layout already defined in the read_mesh.ui file. It consists of a Zinc Widget which handles the graphics, a slider control and two buttons 'Quit' and 'Custom'. When you run the example with 'python read_mesh.py' you can slide the time slider to vary time and animate the model, which is initially drawn with surface graphics. Clicking on the Custom button adds gold points at the nodes.

Initialising your application
=============================

The Read Mesh dialog is derived from QWidget. Following is its initialisation method:

.. literalinclude:: read_mesh.py
  :linenos:
  :start-after: # ReadMeshDlg__init__ start
  :end-before: # ReadMeshDlg__init__ end

Most of what is being done here is explained in the comments. Some parts are initialising member variables for convenient use later; by convention, these begin with an underscore. This example is somewhat contrived as it reads exactly one mesh and sets up graphics appropriate to it; in a real application one may have a file dialog to choose input files.

Reading a time-varying model
============================

.. literalinclude:: read_mesh.py
  :linenos:
  :start-after: # readMesh start
  :end-before: # readMesh end

This example uses a stream information to read 51 node files from a time-varying solution, and associates time with each file. The single element file is added to the information and these are read together into the region.

Creating surface graphics
=========================

.. literalinclude:: read_mesh.py
  :linenos:
  :start-after: # createSurfaceGraphics start
  :end-before: # createSurfaceGraphics end

With one minor exception (Points on the simple 'point' domain), every graphics object needs a coordinate field to give its coordinates, and here we find this by name 'coordinates' in the fieldmodule which manages fields in our region.

Updating time
=============

.. literalinclude:: read_mesh.py
  :linenos:
  :start-after: # timeChanged start
  :end-before: # timeChanged end

The timeChanged() method was set up in the initialise function. It takes the time from the slider widget and sets it in Zinc's default timekeeper object, so zinc knows which time to generate graphics at. Note that the Zinc Widget is automatically informed that the graphics have been changed, and redraws itself.

The Custom button
=================

.. literalinclude:: read_mesh.py
  :linenos:
  :start-after: # customButton start
  :end-before: # customButton end

This method is called when the Custom button is clicked, and is currently set to add points graphics.

Creating node points graphics
=============================

.. literalinclude:: read_mesh.py
  :linenos:
  :start-after: # createNodePointsGraphics start
  :end-before: # createNodePointsGraphics end

Points have a lot more options than surfaces, since you need to decide which domain to view points on, the glyph (here: a sphere) to visualise each point, scaling of the glyph, and more. Point-specific attributes of the glyph are set by the Graphicspointattributes object, and include methods for setting many other scaling options, adding labels and setting the font.

Extending this example
======================

As an exercise you may wish to make your own visualisation or other change, perhaps adapting the customButton() method to do something different. If you have access to QtDesigner you may wish to add more buttons and controls, add signals (actions) and slots (methods on your object) to make them perform useful tasks.
