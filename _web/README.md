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
* sphinx
* python-jinja2
* (Optional) make

The project also depends on packages from npm and bower.

Building the website
--------------------
1. Install the dependencies from your system's packaging manager. For example, in Debian jessie:

   ```
   sudo apt-get install git python nodejs npm python-sphinx python-jinja2 make
   sudo npm -g install bower
   sudo npm -g install grunt-cli
   ```

   In the future a Guix package script may be provided to take care of the installation.

2. Clone this repository.

3. Enter the `_web` directory, install npm and bower packages and do a build:

   If you have make simply run:

   ```
   cd _web
   make
   ```

   Otherwise, run:

   ```
   cd _web
   npm install
   bower install
   grunt
   ```


3. The built website is now available in `_web/dist/`. Serve with your favourite web server.
