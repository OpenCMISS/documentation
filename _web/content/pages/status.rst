Status of the New Website
#########################
:slug: status

Updated on **14 October 2015**.

This website is the new website for the OpenCMISS software. Content is still being migrated from `cmiss.org <http://www.cmiss.org>`_, `physiomeproject.org <http://opencmiss.physiomeproject.org>`_ and other sites.

Source files and instructions to build this website are now available on `GitHub <https://github.com/inkybutton/OpenCMISS-Documentation>`_. This is currently in a personal GitHub account as the repository plan is still being decided.

Please send any feedback and suggestions to `Noel Zeng, the developer working on the project <mailto:bioeng-webmaster@auckland.ac.nz>`_. Be sure to check the Planned section first to see if it's a known issue.

Ready for Feedback
==================

Here is a list of pages that are complete enough. Please take a look and give me feedback on its aesthetics, functionality, structure, and so on.

* `Downloads </downloads.html>`_.
* CMISS Example Model: `Per Pixel Lighting </examples/a/per_pixel_lighting/index.html>`_, `Eye Model </examples/a/eye/index.html>`_ , `Animate Jaw </examples/a/animate_jaw/index.html>`_.
  Note that this page has some Responsive features implemented. That is, sidebar is hidden and the content shrinks and grows in size depending on screen size.
  **Updated August** `Animate Jaw </examples/a/animate_jaw/index.html>`_ has an interactive 3D model.
* `Documentation </doc.html>`_ - **Updated 16 September** some pages have now been converted to the new template.
* `Getting Started index </getting-started.html>`_ - A page linked from on the front page.
* `Community </community.html>`_
* `About page </about.html>`_
* `API documentation </doc.html#technical>`_ **Added on 16 September** - a copy of latest Zinc and Iron API documentation.
* `Developers page </developers.html>`_ **Added on 16 September** Currently just a list of links. Please send in suggestions on how you think they could be categorised.
* `News </news/index.html>`_ - **Updated 24 September** A list of news items, paginated.
* Add section on pages with pending work in status page. **Updated 29 September** Done.
* Compatibility
	* Added Responsive template
	* IE
	* ipad/smaller screen sizes/lower spec devices - make sure the models load. **Updated 6 October** Mostly done, TODO stop front page model from loading if screen size starts out smaller than the compact dimension.
	* **Updated 29 September** Found iPad and search screen bug. Clicking on the search bar always scrolls the page up to the top, and trying to scroll through the results actually scrolls the underlying page instead, causing the results screen to go away.
* Removed KCL/Oxford logo
* Check links that aren't working, send to a Under Construction page.


In Progress
===========
A list of things currently being worked on.

* Automated website build -  Automate building the website with Buildbot using the latest API reference, documentation and web source code.
    * **Updated 14 October** Zinc API doc is now built nightly and available on this website.
	* Copy doxygen documentation output from zinc and opencmiss buildbot.
* Add scrollspy for the sidebar/fix sidebar attachment.


Planned
=======
List of things that will be worked on.

* Downloads page - change to make source code download more prominent, as well as adding links to development versions.
* Navigation is complete - maybe breadcrumb. In the documentation pages, link back to root. See if it works across Sphinx, Doxygen, static pages.
* Fix style for <pre> tags.
* Send out for second round of feedback.
* Documentation around how the site works.
