
Requirements for Building OpenCMISS Libraries
=============================================

The following is a list of the software requried for building the OpenCMISS libraries.  Also listed are softwares required for optional extensions.  It is possible to only build particular OpenCMISS libraries, in this case all the requirements specified here may not be required.

All Platforms
-------------

All platforms require CMake for generating the build scripts, at least version 3.4.0.  If it is not possible to install a versoin that satisifies this requirement then a cmake with a suitable version can be built.  The build process has a facility for building CMake is required, although this itself depends on an older version of CMake being present.

Windows
-------

 - Visual Studio 2015
 - MSMPI
 - Python version 3.5 > (Optional)
 - SWIG (Optional)

OS X
----

 - Clang
 - GFortran
 - SWIG (Optional)

GNU/Linux Ubuntu 
----------------

 - GCC
 - GFortran
 - OpenGL development files
 - Python development files (Optional)
 - SWIG (Optional)

.. note::

  Without SWIG and Python the Python bindings will not be generated.

