How to contribute to OpenCMISS
==============================

One of the key benefits of open source software is that anyone can use and change the code.
This in turn allows many people to improve existing code or contribute new functionality.
We at OpenCMISS want to make contributing as easy as possible while maintaining a high level
of quality.
Achievement of those two conflicting goals is not easy.
The following sections outline the three equally important aspects of contributing to OpenCMISS.
Anyone can contribute code and functionality. The following criteria are essential requirements
to achieve before contributed work can be accepted.

   - The submitted code passes our *functional tests*
   - The documentation is updated/added appropriately
   
Contributions which do not meet these criteria are most welcome and the mechanisms described below
provide a good way in which you are able to submit your work and ask for assistance to achieve these
requirements.
 
Code
----
The OpenCMISS codebase is entirely hosted on GitHub_.
On GitHub, the most effective and integrated way of contributing code is via `pull requests`_.
This essentially means you have a modified version of any OpenCMISS component and asks us to
examine the work and merge those changes into our own codebase.

.. _GitHub: https://github.com 
.. _`pull requests`: https://help.github.com/articles/using-pull-requests/

Testing
-------
Testing is the most essential tool to ensure software quality - having trust in scientific results obtained
with OpenCMISS is of greatest importance!
In order to check and verify the functionality of OpenCMISS components, we use *functional tests*.
Those tests can not only :ref:`be run <build targets>` at your local OpenCMISS installation, but are also used as the benchmark
for contributions to be accepted. Our continuous integration tools (we use Jenkins_ integrated with GitHub_) enable the testing of outstanding pull requests across a variety of platforms and reports the status of the testing to the pull request thread.

This makes testing of your code across multiple operating systems very easy, as all you have to do is create a pull request to our respective source repository.

.. _Jenkins: https://jenkins-ci.org/   

Documentation
-------------

The global system to provide documentation for OpenCMISS is reStructuredText (.rst files) along with the Python_-based 
generator Sphinx_.
Any downloadable documentation files and the OpenCMISS website are generated with this technology.

If you change or add code, always keep the documentation in sync and add new documentation for new functionality.
All the OpenCMISS components have a :path:`/docs` folder at the project root, which is the top level entry point
for the respective component documentation. The :path:`/docs/index.rst` file is the entry point.
Any documentation you place within the components you are working on (Iron/Zinc/..) is automatically pulled into the
overall documentation project and included in the OpenCMISS website.

For detailed documentation instructions refer to the 'how to contribute' parts of Iron_ and Zinc_, respectively.

.. _Sphinx: http://www.sphinx-doc.org/en/stable/
.. _Python: https://www.python.org/
.. _reStructuredText: http://docutils.sourceforge.net/docs/ref/rst/restructuredtext.html
.. _Iron: http://www.opencmiss.org/documentation/iron/contribute
.. _Zinc: http://www.opencmiss.org/documentation/zinc/contribute
