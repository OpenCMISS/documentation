
=======
Windows
=======

For using the Python bindings of the OpenCMISS libraries you will need to install:

   - `Python 2.7.11 64 bit <https://www.python.org/ftp/python/2.7.11/python-2.7.11.amd64.msi>`_
   - The NumPy_ library (:code:`python-numpy`), `this article`_ describes how to install unofficial `64bit Windows NumPy`_ builds, 
     created and maintained by `Christoph Gohlke`_. Woot!
   - [Optional but recommended] The Python virtualenv_ mechanism for independent Python environments
       See http://pymote.readthedocs.org/en/latest/install/windows_virtualenv.html

If you intend to use virtual environments, make sure your target environment is active before proceeding with the following installation steps.

To install the Python bindings, open a command prompt (and activate your virtual environment) and type::

   pip install <SDK_DIR>\lib\pythonX.Y\(Release|Debug)\opencmiss.iron
   pip install <SDK_DIR>\lib\pythonX.Y\(Release|Debug)\opencmiss.zinc

Here, :path:`SDK_DIR` is the installation root of your SDK, the X, and Y are placeholders for the major and minor version of Python that the bindings have been built for.  The major and minor version number defined in the path must match the major and minor version number of the Python intreperter in use, and :path:`(Release|Debug)` refers to the build type. For the current Windows SDK, this path could be for example:: 

   pip install <SDK_DIR>\lib\python3.5\Release\opencmiss.iron

for Iron Python bindings or::

   pip install <SDK_DIR>\lib\python3.5\Release\opencmiss.zinc

for Zinc Python bindings.   

.. _NumPy: http://www.numpy.org/
.. _virtualenv: https://virtualenv.readthedocs.org/en/latest/  
.. _`this article`: http://stackoverflow.com/questions/11200137/installing-numpy-on-64bit-windows-7-with-python-2-7-3
.. _`64bit Windows NumPy`: http://www.lfd.uci.edu/~gohlke/pythonlibs/#numpy
.. _`Christoph Gohlke`: http://www.lfd.uci.edu/~gohlke/

