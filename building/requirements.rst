
=============================================
Requirements for Building OpenCMISS Libraries
=============================================

The following is a list of the software requried for building the OpenCMISS libraries.  Also listed are softwares required for optional extensions.  It is possible to only build particular OpenCMISS libraries, in this case all the requirements specified here may not be strictly required.  For example, if only the zinc library is to be built then a fortran compiler is not necessary.

-------------
All Platforms
-------------

All platforms require CMake for generating the build scripts, where CMake is at least version 3.4.0.  If it is not possible to install a version that satisifies this requirement then a CMake with a suitable version can be built.  The build generation scripts have a facility for building CMake, although this itself depends on an older version of CMake being present.  A target 'cmake' will automatically be created if the CMake application in use does not meet the minimum version requirements.

-------
Windows
-------

 - Visual Studio 2015
 - Intel fortran
 - MSMPI
 - Python version 3.5 > (Optional)
 - SWIG (Optional)

----
OS X
----

 - Clang
 - GFortran
 - SWIG (Optional)

----------------
GNU/Linux Ubuntu 
----------------

 - GCC
 - GFortran
 - OpenGL development files
 - Python development files (Optional)
 - SWIG (Optional)

.. note::

  Without SWIG and Python the Python bindings cannot be generated.

