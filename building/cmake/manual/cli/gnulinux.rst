
=========
GNU/Linux
=========

The following instructions have been tried and tested on Ubuntu 16.04, other variants of GNU/Linux haven't specifically been tested but the instructions are expected to work none the less.

CMake Modules
=============

The build relies on using shared CMake module scripts. These scripts are available from https://github.com/OpenCMISS/cmake_modules.git. The following commands setup the CMake modules required for the rest of the build.

::

  mkdir -p opencmiss/src
  cd opencmiss/src
  git clone https://github.com/OpenCMISS/cmake_modules.git
  cd ..
  mkdir -p build/cmake_modules/release
  cd build/cmake_modules/release
  cmake ../../../src/cmake_modules
  make install

Manage
======

The manage files make up the management part of the installation.  These files can manage tasks such as updating source code, creating configurations, and building configurations.  To create an installation suitable for developing OpenCMISS libraries execute the following commands::

  cd <OPENCMISS ROOT> 
  
# OPENCMISS ROOT is the directory 'opencmiss' from above.  If following on directly from the above instructions this command would be equivalent to::

  cd ../../..

The following instructions assume the current working directory is 'opencmiss'::

  cd src
  git clone https://github.com/OpenCMISS/manage.git
  cd manage  # Once release has been finalised this line will not be required.
  git checkout develop  # Once release has been finalised this line will not be required.
  cd ..   # Once release has been finalised this line will not be required.
  cd ..
  mkdir -p build/manage/release
  cd build/manage/release
  cmake ../../../src/manage

At this point we are ready to create our first configuration to build.  In the following example we wish to build a 'Debug' configuration using the default compilers.  To setup for this configuration execute the following command::

  cmake -DOPENCMISS_BUILD_TYPE=Debug -DOPENCMISS_DEVELOP_ALL=TRUE .
  make create_config
  make build_config  # This command will take somewhere in the region on one hour to execute!

At this point you should have built a 'Debug' version of the OpenCMISS libraries.  If you wanted to create a 'Release' configuration that used intel compilers instead of the default compilers (assuming the intel compilers aren't your default compilers) you would execute the following commands::

  cmake -DOPENCMISS_BUILD_TYPE=Release -DOPENCMISS_DEVELOP_ALL=TRUE -DOPECMISS_TOOLCHAIN=intel .
  make create_config
  make build_config

.. note:: The  -DOPENCMISS_DEVELOP_ALL=TRUE configuration parameter will not be required once the release has been finalised.

.. note:: The compilers that you intend to use must be on the path for CMake to be able to find them.

To learn more about how to manage configurations and the options that can be used in creating a configuration read :doc:`../../manage/docs/index`.

