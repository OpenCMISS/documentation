# All configuration values have a default; values that are commented out
# serve to show the default.

import sys
import os
import shlex

# -- General configuration ------------------------------------------------

# If your documentation needs a minimal Sphinx version, state it here.
#needs_sphinx = '1.0'

nitpicky = True
project = 'OpenCMISS Libraries Documentation'
copyright = '2016, Auckland Bioengineering Institute'
version = '1.1'

# The master toctree document.
master_doc = 'index'

# needed to find the cmake extension (copied to the containing folder by grunt script)
sys.path.insert(1, os.path.abspath('.'))

# Set numfig on to enable numref
numfig = True

# Add any Sphinx extension module names here, as strings. They can be
# extensions coming with Sphinx (named 'sphinx.ext.*') or your custom
# ones.
extensions = [
    'sphinx.ext.autodoc',
    'sphinx.ext.doctest',
    'sphinx.ext.intersphinx',
    'sphinx.ext.todo',
    'sphinx.ext.coverage',
    'sphinx.ext.mathjax',
    'sphinxcontrib.rawfiles',
    'cmake',
]

# Raw files to copy to destination
rawfiles = [
    'videos/oclibs_intro',
    'videos/oclibs_install_reqs_intro',
    'videos/oclibs_install_reqs_ubuntu',
    'videos/oclibs_sdk_intro',
    'videos/oclibs_sdk_ubuntu',
    'videos/oclibs_building_intro',
    'videos/oclibs_building_ubuntu',
]

if os.path.exists('_themes/ocmiss/partials/common_with_sidebar.jinja'):
    html_theme = "ocmiss"
    html_theme_path = ["_themes"]
