
====
OS X
====

For using the Python bindings of the OpenCMISS libraries you will need to install:

   - The NumPy_ library (:code:`python-numpy`).  Basic install instructions are given below, for more detailed instructions read the documentation available from SciPy_.
     To install via pip, first upgrade pip to the latest version::

       python -m pip install --upgrade pip

     Then install for the local user::

       pip install --user numpy

   - [Optional but recommended] The Python virtualenv_ mechanism for independent Python environments

If you intend to use virtual environments, make sure your target environment is active before proceeding with the following installation steps.

To install the Python bindings, open a command prompt (and activate your virtual environment) and type::

   pip install --user <SDK_DIR>/lib/python2.7/(Release|Debug)/opencmiss.iron
   pip install --user <SDK_DIR>/lib/python2.7/(Release|Debug)/opencmiss.zinc

Here, :path:`SDK_DIR` is the installation root of your SDK, and :path:`(Release|Debug)` refers to the build type. For the current Windows SDK, this path could be for example:: 

   pip install --user <SDK_DIR>\lib\python2.7\Release\opencmiss.iron

for Iron Python bindings or::

   pip install --user <SDK_DIR>\lib\python2.7\Release\opencmiss.zinc

for Zinc Python bindings.   

.. note:: If using a virtualenv installation do not use the :code:`--user` option unless you created the virtual environment using the :code:`--system-site-packages` option.

.. _NumPy: https://www.numpy.org/
.. _SciPy: https://www.scipy.org/install.html
.. _virtualenv: https://virtualenv.readthedocs.org/en/latest/  
