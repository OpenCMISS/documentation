# All configuration values have a default; values that are commented out
# serve to show the default.

import sys
import os
import shlex

# -- General configuration ------------------------------------------------

# If your documentation needs a minimal Sphinx version, state it here.
#needs_sphinx = '1.0'

nitpicky = True
project = 'OpenCMISS Website'
copyright = '2016, Auckland Bioengineering Institute'
version = '1.1'

# The master toctree document.
master_doc = 'index'

# needed to find the cmake extension (copied to the containing folder by grunt script)
sys.path.insert(0, os.path.abspath('.'))

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
    'cmake'
]

html_theme = "ocmiss"
html_theme_path = ["templates"]
exclude_patterns = ["_web/**"]
