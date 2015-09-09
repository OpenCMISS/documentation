#!/usr/bin/python
"""
PyZinc examples

This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
"""

import sys
try:
    from PySide import QtGui
    from axis_viewer_ui_pyside import Ui_AxisViewerDlg
except ImportError:
    from PyQt4 import QtGui
    from axis_viewer_ui_pyqt4 import Ui_AxisViewerDlg

# opencmiss.zinc.imports start
from opencmiss.zinc.context import Context as ZincContext
from opencmiss.zinc.glyph import Glyph
# opencmiss.zinc.imports end

# AxisViewerDlg start
class AxisViewerDlg(QtGui.QWidget):
    '''
    Create a subclass of QWidget for our application.  We could also have derived this 
    application from QMainWindow to give us a menu bar among other things, but a
    QWidget is sufficient for our purposes.
    '''
    
    def __init__(self, parent=None):
        '''
        Initiaise the AxisViewerDlg first calling the QWidget __init__ function.
        '''
        QtGui.QWidget.__init__(self, parent)
 
        # create instance of Zinc Context from which all other objects are obtained
        self._context = ZincContext("Axis Viewer");

        # set up standard materials and glyphs so we can use them elsewhere
        # define standard materials first as some coloured glyphs use them
        materialmodule = self._context.getMaterialmodule()
        materialmodule.defineStandardMaterials()
        # this example uses a standard axes glyph hence need the following:
        glyphmodule = self._context.getGlyphmodule()
        glyphmodule.defineStandardGlyphs()

        # Using composition to include the visual element of the GUI.
        self.ui = Ui_AxisViewerDlg()
        self.ui.setupUi(self)
        # Must pass the context to the ZincWidget to set it up
        self.ui._zincwidget.setContext(self._context)
        self.setWindowIcon(QtGui.QIcon(":/cmiss_icon.ico"))
        self.resize(620, 440)

        # set up content for this application
        self.setupAxes()
        # AxisViewerDlg end

    # AxisViewerDlg.setupAxes start
    def setupAxes(self):
        region = self._context.getDefaultRegion()
        # Graphics for visualising a region belong to its scene      
        scene = region.getScene()
        
        # Call beginChange() to stop scene change messages being sent while
        # making multiple changes to scene or its graphics.
        # It's very important to call endChange() at the end!
        scene.beginChange()
        
        # Create Points graphics in scene and visualise with unit-sized solid 3-D axes
        graphics = scene.createGraphicsPoints()
        attributes = graphics.getGraphicspointattributes()
        attributes.setGlyphShapeType(Glyph.SHAPE_TYPE_AXES_SOLID)
        # Note: default base size of 0.0 would make axes invisible!
        attributes.setBaseSize([1.0])

        # Restart scene messaging and inform clients of changes.
        # This ultimately triggers a redraw in the Zinc Widget.
        scene.endChange()
        # AxisViewerDlg.setupAxes end

# main start
def main(argv):
    '''
    The entry point for the application, handle application arguments and initialise the 
    GUI.
    '''
    
    app = QtGui.QApplication(argv)

    w = AxisViewerDlg()
    w.show()

    sys.exit(app.exec_())
# main end

if __name__ == '__main__':
    main(sys.argv)
