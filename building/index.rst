.. OpenCMISS build documentation master file, created by
   sphinx-quickstart on Tue Jul 28 17:19:43 2015.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

========================================
Building OpenCMISS Libraries From Source
========================================

------------
Requirements
------------

The list of the software requried for building the OpenCMISS libraries is outlined in :doc:`requirements`.

-----------
Quick Start
-----------

The following instructions describe the procedure for building a release version of OpenCMISS libraries from the command line. If you wish to build a debug version, please read :doc:`cmake/setup/docs/index` for more information.

::

 mkdir opencmiss
 mkdir setup-build
 git clone https://github.com/OpenCMISS/setup.git
 cd setup-build
 cmake -DOPENCMISS_ROOT=../opencmiss ../setup
 cmake --build .

If executing these commands from a Visual Studio command prompt on a Windows
 machine the penultimate command may need to by adapted to include the
 generator required. For example if a 64 bit Visual Studio build is desired
 the command would be adapted to::

  cmake -DOPENCMISS_ROOT=../opencmiss -G"Visual Studio 14 2015 Win64" ../setup

When building the OpenCMISS libraries from source it is advisable to have git installed and available. If this is not the case the :command:`git clone` command above can be replaced with the unzipped source available from https://github.com/OpenCMISS/setup.

---------------
Further Details
---------------

For parties interested in the details and an understanding of the above commands the documentation below explains further.

Making use of the setup repository to create an OpenCMISS libraries installation can simplify the insatllation process, however if you require a specific installation consider installing OpenCMISS manually.  Before starting make sure to check the requirements documentation

.. toctree::
   :maxdepth: 1

   Requirements <requirements>

.. toctree::
   :maxdepth: 1

   Install using setup helper scripts <cmake/setup/docs/index>
   Install manually <cmake/manual/index>

.. Pages that don't need to be shown can be included under this toctree.
.. toctree::
   :hidden:

