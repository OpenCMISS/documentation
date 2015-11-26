OpenCMISS Website
=================

Source for the new OpenCMISS website.
License TBD.

Dependencies
------------
* Python 2.7.
* nodejs
* npm
* bower (installed through npm)
* grunt-cli (installed through npm)
* virtualenv
* SVN (for building the API documentation)
* make

The project also depends on packages from npm, bower and pip.

Building the website
--------------------
1. Install the dependencies from your system's packaging manager. For example, in Debian jessie:

   ```
   sudo apt-get install git python nodejs npm virtualenv make
   sudo npm -g install bower
   sudo npm -g install grunt-cli
   ```

   In the future a Guix package script may be provided to take care of the installation.

2. Clone this repository.

3. Enter the `_web` directory, install npm and bower packages and do a build:

   Run the following. Replace [URL] with the root of where this site will be hosted, e.g. "next.opencmiss.org". This is used for generating a sitemap for the website. 

   ```
   cd _web
   export SITE_URL=[URL];make
   ```
   NOTE - The first time the script is run, you may run into this prompt:
   
   ```
   Error validating server certificate for 'https://...':
    - The certificate is not issued by a trusted authority. Use the
      fingerprint to validate the certificate manually!
   Certificate information:
    - Hostname: ...
    - Valid: from ... until ...
    - Issuer: ...
    - Fingerprint: ...
   (R)eject, accept (t)emporarily or accept (p)ermanently? 
   ```

   This is because during the API documentation build, we need to fetch the Zinc library source from Physiome Project's SVN server. The SVN server uses an SSL certificate that isn't recognised. Please verify the certificate, and if it's correct, accept it Permanently to store it.


4. The built website is now available in `_web/build/dist/`. Serve with your favourite web server.
