=======================
Developer Login Scripts
=======================

This section describes the optional Unix login scripts that developers can use to setup their development environment.

.. contents::

Obtaining the Scripts
=====================

The development scripts are held in the utilities repository on GitHub i.e.,

   https://github.com/OpenCMISS/utilities

You will need to either fork and clone this repository from your GitHub organiziation or clone it from the main OpenCMISS organization i.e.

        cd <somewhere/you/keep/development/code>

and
        git clone git@github.com:username/utilities.git

or
        git clone https://github.com/OpenCMISS/utilities.git

The login scripts will be located in the scripts directory of the cloned utilities repository.

Using the Scripts
=================

To use the script you must invoke the script from your login script. If you use a bash shell you will invoke it from your ~/.bashrc or ~/.profile scripts in your home directory. If you use the csh or tcsh you will invoke it from your ~/.cshrc in your home directory. If you are unsure of what shell you are using examine the output from

   echo $SHELL

For bash users
--------------

To invoke it add the following commands to your ~/.bashrc or ~/.profile script.

::

   export OPENCMISS_ROOT=<path-to-where-you-put-your-OpenCMISS-files>
   if [ -r "$OPENCMISS_ROOT/utilities/scripts/opencmiss_developer.sh" ]; then
       . $OPENCMISS_ROOT/utilities/scripts/opencmiss_developer.sh
       fi

For csh/tcsh users
------------------

To invoke it add the following commands to your ~/.cshrc script.

::

   setenv OPENCMISS_ROOT <path-to-where-you-put-your-OpenCMISS-files>
   if ( -r "${OPENCMISS_ROOT}/utilities/scripts/opencmiss_developer.csh" ) then
       source ${OPENCMISS_ROOT}/utilities/scripts/opencmiss_developer.csh
   endif

Login Script Configuration Options
==================================

There are a number of options that can be use to configure the OpenCMISS developers login script and to customise its actions. To customise any actions of the login script simply set the variables appropriately before the login script is invoked e.g. For bash users

::

   export OPENCMISS_ROOT=<path-to-where-you-put-your-OpenCMISS-files>
   export OPENCMISS_TOOLCHAIN=gnu
   export OPENCMISS_MPI=mpich
   export OPENCMISS_BUILD_TYPE=debug
   export OPENCMISS_SETUP_TOTALVIEW=false
   if [ -r "$OPENCMISS_ROOT/utilities/scripts/opencmiss_developer.sh" ]; then
       . $OPENCMISS_ROOT/utilities/scripts/opencmiss_developer.sh
   fi

and for csh/tcsh users

::

   setenv OPENCMISS_ROOT <path-to-where-you-put-your-OpenCMISS-files>
   setenv OPENCMISS_TOOLCHAIN gnu
   setenv OPENCMISS_MPI mpich
   setenv OPENCMISS_BUILD_TYPE debug
   setenv OPENCMISS_SETUP_TOTALVIEW false
   if ( -r "${OPENCMISS_ROOT}/utilities/scripts/opencmiss_developer.csh" ) then
       source ${OPENCMISS_ROOT}/utilities/scripts/opencmiss_developer.csh
   endif

Details on the individual environment variables are listed below.

.. toctree::
   :maxdepth: 2

OPENCMISS_ROOT
--------------

This is the enviroment variable that gives directory path to the OpenCMISS files. It must be set. 

OPENCMISS_INSTALL_ROOT
----------------------

This environment variable points to where the OpenCMISS files are installed. Optional. If it is not specified it defaults to OPENCMISS_ROOT/install.

OPENCMISS_TOOLCHAIN
-------------------

This environment variable specifies the toolchain for OpenCMISS to be setup. Available options are gnu and intel. 

OPENCMISS_BUILD_TYPE
--------------------

This environment variable specifies the build type of OpenCMISS to be setup. Available options are debug, release, relwithdebinfo and minsizerel. Defaults to release.

OPENCMISS_MPI
-------------

This environment variable specifies the MPI library to use with OpenCMISS. Available options are none, mpich, mpich2, openmpi, mvapich2 or intel. Defaults to none.

OPENCMISS_MPI_BUILD_TYPE
------------------------

This environment variable specifies the build type of MPI to be setup. Available options are debug, release and relwithdebinfo. Defaults to release.

OPENCMISS_INSTRMENTATION
------------------------

This environment variable specifies the type of code instrumentation to use with OpenCMISS. Available options are scorep, vtune or none. Defaults to none.

OPENCMISS_SETUP_PYTHONPATH
--------------------------

This environment variable controls whether or not the python path is setup for OpenCMISS. The path is setup if the variable is true, and not setup if the variable is false. Defaults to false. 

OPENCMISS_SETUP_INTEL
---------------------

This environment variable controls whether or not the Intel compilers are setup. The compilers are setup if the variable is true, and not setup if the variable is false. Defaults to true. 

INTEL_ROOT
^^^^^^^^^^

This environment variable points to where Intel software is setup on the system. Defaults to /opt/intel.

OPENCMISS_USE_MKL_THREADING
^^^^^^^^^^^^^^^^^^^^^^^^^^^

If this environment variable is set threading layers of Intel's MKL (Math Kernel Library) will be setup.

OPENCMISS_SETUP_TOTALVIEW
-------------------------

This environment variable controls whether or not the Totalview debugger is setup. The debugger is setup if the variable is true, and not setup if the variable is false. Defaults to true.

TOTALVIEW_PATH
^^^^^^^^^^^^^^

This environment variable points to where Totalview is setup on the system. Defaults to /opt/toolworks.

TOTALVIEW_VERSION
^^^^^^^^^^^^^^^^^

This environment givens the version of Totalview to setup. Defaults to 2017.1.21.

FLEXLM_VERSION
^^^^^^^^^^^^^^

This environment givens the version of FlexLM to setup with Totalview. Defaults to 11.13.1-1.

OPENCMISS_SETUP_LATEX
---------------------

This environment variable controls whether or not the OpenCMISS LaTeX environment is setup. The LaTeX environment is setup if the variable is true, and not setup if the variable is false. Defaults to true. 

OPENCMISS_SETUP_GITPROMPT
-------------------------

This environment variable controls whether or not the shell prompt is setup to display information on the current directory and git branch. The git shell prompt is setup if the variable is true, and not setup if the variable is false. Defaults to true. 
