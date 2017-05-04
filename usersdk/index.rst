
==================================
Using OpenCMISS Libraries From SDK
==================================

Having already downloaded and installed the SDK on your computer the following instructions will get you set up and started using the OpenCMISS libraries.

The SDK provides pre-compiled binaries of all the OpenCMISS libraries and can be used to develop your own applications against them
using either the directly exposed APIs or provided bindings to C or Python languages.
Check the `downloads section <http://www.opencmiss.org/downloads.html>`_ for current packages.

In addition to the SDK, you need a local MPI installation if you want to run parallel code with OpenCMISS-Iron.

As the use is different depending on the intended API, please see the appropriate sections below.

--------------------------
Using the Fortran or C API
--------------------------

We recommend that you use CMake_ to develop applications using the OpenCMISS libraries (OpenCMISS libraries are built using CMake), of which you need version 3.4.0 or newer.  Instructions for other ways of using the installed SDK libraries in your development environment will be `added later`_.

An outline of a CMake script for understanding how to use OpenCMISS libraries in your application is given below.  An exemplar :path:`CMakeLists.txt` could look like::

   # This is my application which uses OpenCMISS libraries
   
   cmake_minimum_required(VERSION 3.4.0)
   project(MyOpenCMISSApplication LANGUAGES C Fortran)
   
   find_package(OpenCMISSLibs <VERSION> REQUIRED COMPONENTS [Iron|Zinc] CONFIG)
   
This will look for an OpenCMISS libraries package information file, which is contained in your SDK installation. 
It will also verify that the found SDK does in fact match your currently configured toolchain and MPI choice.
Then, to add OpenCMISS-powered libraries and executables, use::   
   
   # For a library use
   add_library(mylib <SOURCES>)
   target_link_libraries(mylib PRIVATE opencmiss)
   
   # For an executable use
   add_executable(myexec <SOURCES>)
   target_link_libraries(mylib PRIVATE opencmiss)
   
If you wanted to add a test for your binaries/libraries, you can conveniently use::

   # Add a test that runs your binary
   add_test(myapptest myexec)
   add_opencmiss_environment(myapptest)
   
The :cmake:`add_opencmiss_environment` function will set up the test environment to contain the necessary library paths.
The testing can then be run using CTest_

.. _CTest: https://cmake.org/cmake/help/v3.4/manual/ctest.1.html 

Finally, to configure your application, you need to set the variable :cmake:`OpenCMISSLibs_DIR` to your SDK installation
folder in CMake (define in CMake-GUI or set via :cmake:`-DOpenCMISSLibs_DIR` in command line).

.. note::

   If suitable, you may also define the :cmake:`OpenCMISSLibs_DIR` variable in your environment. This way you dont have to specify it when
   configuring your own component builds through CMake/manage.
   *Windows only* If you chose the default install location, CMake can pick up the installation via system default paths and you dont have to
   specify anything!

.. _CMake: http://www.cmake.org/download
.. _`added later`: https://github.com/OpenCMISS/manage/issues/54

-------------------------
Using the Python bindings
-------------------------

The currently available SDKs come with Python bindings.  Each platform uses a different version of Python so read the specific documentation for your operating system.  We aim to provide support for other versions of Python in the future. 

.. toctree::
   :maxdepth: 2
   
   windows
   gnulinux
   osx


