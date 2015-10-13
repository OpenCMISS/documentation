Guide to Contributing Documentation
===================================

Some notes on how to add and edit documentation in this repository.

The website hosted on next.opencmiss.org is being built by a Buildbot instance hosted by the ABI.

The project uses Sphinx for generating documentation, and Pelican for generating news and most custom pages. Documentation is stored in RST files. It also uses custom Grunt scripts to process web assets such as scripts and stylesheets.

See _web/README.md for instructions on setting up a local instance of the website.


Branches and Editing Procedure
------------------------------

Two Git branches are meaningful to the Buildbot instance. 

* master - is the release version of the website which is built and served on next.opencmiss.org.
* develop is the staging version of the website, where changes can be merged in to preview. It is built and served on staging.opencmiss.org.

If you want to contribute documentation, the procedure would be to have make the changes in a branch created off develop. Merge the changes into (or create a pull request for) the develop branch so you can preview its effect on the website. When it is satisfactory, merge the changes into master so they are shown on the main website.
