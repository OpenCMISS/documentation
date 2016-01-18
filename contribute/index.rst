How to contribute to OpenCMISS
==============================

One of the key benefits of open source software is that anyone can use and change the code.
This in turn allows many people to improve existing code or contribute new functionality.
We at OpenCMISS want to make contributing as easy as possible while maintaining a high level
of quality.
Achievement of those two conflicting goals is not easy.
The following sections outline the three equally important aspects of contributing to OpenCMISS.
Essentially, anyone can contribute code and functionality, if

   - The submitted code passes our *key tests*
   - The documentation is updated/added appropriately
 
Code
----
The OpenCMISS codebase is entirely hosted on GitHub_.
On GitHub, the most effective and integrated way of contributing code is via `pull requests`_.
This essentially means you have a modified version of any OpenCMISS component and tell us to
merge in those changes into our own codebase.

.. _GitHub: https://github.com 
.. _`pull requests`: https://help.github.com/articles/using-pull-requests/

Testing
-------
Testing is the most essential tool to ensure software quality - having trust in scientific results obtained
with OpenCMISS is of greatest importance!
In order to check and verify the functionality of OpenCMISS components, we use *key tests*.
Those tests can not only be run at your local OpenCMISS installation, but are also used as benchmark
for contributions. Out continuous integration tools (we use Jenkins_ integrated with GitHub_) allow
to merge your outstanding pull requests, run the key tests and report back to the pull request thread.

On the plus side: This makes testing of your code very easy, as all you have to do is create a pull request to our
respective source repository.
On the minus side: Your changes will not be accepted before all the key tests pass!

.. _Jenkins: https://jenkins-ci.org/   

Documentation
-------------

The global system to provide documentation for OpenCMISS is reStructuredText (.rst files) along with the Python_-based 
generator Sphinx_.
Any downloadable PDF files and the OpenCMISS website are generated with this technology. 

If you change or add code, always keep the documentation in sync and add new documentation for e.g. new functionality.

**TODO** add section for macros, examples etc here. 

.. _Sphinx: http://www.sphinx-doc.org/en/stable/ 
