Build script for API documentation
==================================

NOTE - The first time the script is run, SVN may warn you about an unknown CA certificate. This is the CA certificate presented by the Physiome Project SVN server, please verify the certificate, and then accept it Permanently to store it.

Use this script to generate Zinc C++ header with comments and doxygen page.

Currently it issues an svn command to checkout Zinc from https://svn.physiomeproject.org/svn/cmiss/zinc/library/.

Requirement
-----------
* SVN (Required for tracking the Zinc library SVN repository.)

Build It
--------
Run `make`.  The built API documentation will be available in the `build` directory.
