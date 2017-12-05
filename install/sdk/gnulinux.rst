
=========
GNU/Linux
=========

The following instructions are targeted at the Ubuntu distribution of GNU/Linux.  The following instructions also assume that the SDK for Ubuntu has been downloaded from the `opencmiss website <http://opencmiss.org/downloads.html>`_ and has been saved into the 'Downloads' directory on a local disk.

-----------
Extract SDK
-----------

The first task is to create a directory in to which the SDK can be extracted::

   mkdir opencmiss_sdk

Then we can use the tar command to extract the files from the SDK, first changing into the 'opencmiss_sdk' directory::

   cd opencmiss_sdk
   tar xzf ~/Downloads/OpenCMISS-Libraries_1.3.0_SDK_Ubuntu-16.04.tar.gz

That is all we need to do to make the SDK available on our system.

------------------------------
Setting Up Virtual Environment
------------------------------

We can set up a virtual environment with the OpenCMISS Iron and Zinc libraries.  This will enable us to run Iron and Zinc Python scripts and applications using the created virtual enviroment.

For using the Python bindings of the OpenCMISS libraries you will need to install:

- The NumPy_ library (:code:`python-numpy`).  Basic install instructions are given below, for more detailed instructions read the documentation available from SciPy_.
     To install on Ubuntu (using package manager)::

        sudo apt-get install python-numpy

- The Python virtualenv_ mechanism for independent Python environments

With virtualenv_ installed execute the following commands in a terminal application to create and activate the virtual environment::

   virtualenv --system-site-packages venv_opencmisslibs
   source venv_opencmisslibs/bin/activate

We have created and activated a Python virtual environment that makes use of all the Python packages available from the system.  We can create the virtual environment anywhere, we don't have to create it inside the 'opencmiss_sdk' directory.  Next we install the OpenCMISS libraries Python bindings into the active virtual environment.  Again from the terminal application enter the following commands (assumes virtual environment activated above is still active)::

   pip install -e <SDK_DIR>/lib/pythonX.Y/(Release|Debug)/opencmiss.iron
   pip install -e <SDK_DIR>/lib/pythonX.Y/(Release|Debug)/opencmiss.zinc

Here, :path:`SDK_DIR` is the installation root of your SDK, the X, and Y are placeholders for the major and minor version of Python that the bindings have been built for.  The major and minor version number defined in the path must match the major and minor version number of the Python intreperter in use, and :path:`(Release|Debug)` refers to the build type. For the current Windows SDK, this path could be for example:: 

   /home/opencmiss/opencmiss_sdk/lib/python2.7/Release/opencmiss.iron

for Iron Python bindings or::

   /home/opencmiss/opencmiss_sdk/lib/python2.7/Release/opencmiss.zinc

for Zinc Python bindings.   

Check Installed Libraries
-------------------------

With the OpenCMISS libraries installed into the virtual environment we can perform a quick check to make sure the process was successful.  First we launch Python (the virtual environment Python)::

   python

Then from the python command prompt we can enter::

   >>> from opencmiss.iron import iron
   >>> from opencmiss.zinc.context import Context

If the opencmiss libraries have been installed properly then nothing should happen, congratulations the libraries have been properly installed!

If an error message appeared try emailing the `mailing lists <http://opencmiss.org/community.html#mailinglist>`_ for help.

.. _NumPy: https://www.scipy.org/
.. _SciPy: https://www.scipy.org/install.html
.. _virtualenv: https://virtualenv.readthedocs.org/en/latest/  

