
=========
GNU/Linux
=========

For using the Python bindings of the OpenCMISS libraries you will need to install:

   - The NumPy_ library (:code:`python-numpy`).  Basic install instructions are given below, for more detailed instructions read the documentation available from SciPy_.
     To install on Ubuntu (using package manager)::

        sudo apt-get install python-numpy

   - [Optional but recommended] The Python virtualenv_ mechanism for independent Python environments

If you intend to use virtual environments, make sure your target environment is active before proceeding with the following installation steps.

To install the Python bindings, open a command prompt (and activate your virtual environment) and type::

   pip install --user <SDK_DIR>/lib/pythonX.Y/(Release|Debug)/opencmiss.iron
   pip install --user <SDK_DIR>/lib/pythonX.Y/(Release|Debug)/opencmiss.zinc

Here, :path:`SDK_DIR` is the installation root of your SDK, the X, and Y are placeholders for the major and minor version of Python that the bindings have been built for.  The major and minor version number defined in the path must match the major and minor version number of the Python intreperter in use, and :path:`(Release|Debug)` refers to the build type. For the current Windows SDK, this path could be for example:: 

   pip install --user <SDK_DIR>\lib\python3.4\Release\opencmiss.iron

for Iron Python bindings or::

   pip install --user <SDK_DIR>\lib\python3.4\Release\opencmiss.zinc

for Zinc Python bindings.   

.. note:: If using a virtualenv installation do not use the :code:`--user` option unless you created the virtual environment using the :code:`--system-site-packages` option.

.. _NumPy: https://www.scipy.org/
.. _SciPy: https://www.scipy.org/install.html
.. _virtualenv: https://virtualenv.readthedocs.org/en/latest/  

