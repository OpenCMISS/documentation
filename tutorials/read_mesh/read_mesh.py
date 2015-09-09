#!/usr/bin/python
'''
Created on Mar 27, 2013
Updated April 11, 2014

@author: hsorby rchristie
'''

import sys
try:
    from PySide import QtGui
except ImportError:
    from PyQt4 import QtGui
from read_mesh_ui import Ui_ReadMeshDlg

from opencmiss.zinc.context import Context as ZincContext
from opencmiss.zinc.status import OK as ZINC_OK
from opencmiss.zinc.field import Field
from opencmiss.zinc.streamregion import StreaminformationRegion
from opencmiss.zinc.glyph import Glyph

class ReadMeshDlg(QtGui.QWidget):
    '''
    Create a subclass of QWidget for our application.  We could also have derived this 
    application from QMainWindow to give us a menu bar among other things, but a
    QWidget is sufficient for our purposes.
    '''

    # ReadMeshDlg__init__ start
    def __init__(self, parent=None):
        '''
        Initiaise the ReadMeshDlg first calling the QWidget __init__ function.
        '''
        QtGui.QWidget.__init__(self, parent)

        # create instance of Zinc Context from which all other objects are obtained
        self._context = ZincContext("ModelViewer");
        # set up standard materials and glyphs so we can use them elsewhere
        self._materialmodule = self._context.getMaterialmodule()
        self._materialmodule.defineStandardMaterials()
        self._glyphmodule = self._context.getGlyphmodule()
        self._glyphmodule.defineStandardGlyphs()

        # improve tessellation quality
        tessellationmodule = self._context.getTessellationmodule()
        defaultTessellation = tessellationmodule.getDefaultTessellation()
        defaultTessellation.setMinimumDivisions([6])

        default_region = self._context.getDefaultRegion()
        timekeepermodule = self._context.getTimekeepermodule()
        self._timekeeper = timekeepermodule.getDefaultTimekeeper()
        
        # create region to load mesh into
        self._region = default_region.createChild('myregion')

        # read the model and create some graphics to see it
        self.readMesh()
        self.createSurfaceGraphics()

        # Using composition to include the visual element of the GUI.
        self.ui = Ui_ReadMeshDlg()
        self.ui.setupUi(self)
        # Must pass the context to the ZincWidget for it to work
        self.ui._zincwidget.setContext(self._context)
        self.setWindowIcon(QtGui.QIcon(":/cmiss_icon.ico"))

        # set up callbacks for changes in the time slider
        self.ui.timeSlider.valueChanged.connect(self.timeChanged)
        self.resize(620, 440)
        # ReadMeshDlg__init__ end
        
    # readMesh start
    def readMesh(self):
        sir = self._region.createStreaminformationRegion()
        for i in range(51):
            filename = 'mesh_data/heart{:0>4}.exnode'.format(i)
            fr = sir.createStreamresourceFile(filename)
            sir.setResourceAttributeReal(fr, StreaminformationRegion.ATTRIBUTE_TIME, i/50.0)
        sir.createStreamresourceFile('mesh_data/heart.exelem')
        self._region.read(sir)
        # readMesh end

    # timeChanged start
    def timeChanged(self, value):
        self._timekeeper.setTime(value/100.0)
        # timeChanged end

    # createSurfaceGraphics start
    def createSurfaceGraphics(self):
        
        scene = self._region.getScene()
        field_module = self._region.getFieldmodule()

        # We use the beginChange and endChange to wrap any immediate changes and will
        # streamline the rendering of the scene.
        scene.beginChange()
        
        surface = scene.createGraphicsSurfaces()
        coordinate_field = field_module.findFieldByName('coordinates')
        surface.setCoordinateField(coordinate_field)
        surface.setExterior(True) # show only exterior surfaces
        # Let the scene render the scene.
        scene.endChange()
        # createSurfaceGraphics end
   
    # createNodePointsGraphics start
    def createPointGraphics(self):

        scene = self._region.getScene()
        graphicsName = "points"
        # only create points if we don't already have them
        existingGraphics = scene.findGraphicsByName(graphicsName)
        if existingGraphics.isValid():
            return

        field_module = self._region.getFieldmodule()
        scene.beginChange()
        # create points at nodes shown with gold spheres
        points = scene.createGraphicsPoints()
        points.setName(graphicsName)
        coordinate_field = field_module.findFieldByName('coordinates')
        points.setFieldDomainType(Field.DOMAIN_TYPE_NODES) # show points at nodes
        points.setCoordinateField(coordinate_field)
        pointattr = points.getGraphicspointattributes()
        pointattr.setGlyphShapeType(Glyph.SHAPE_TYPE_SPHERE)
        pointattr.setBaseSize([2.0])
        gold = self._materialmodule.findMaterialByName("gold")
        points.setMaterial(gold)
        scene.endChange()
        # createNodePointsGraphics end

    # customButton start
    def customButton(self):
        '''
        Open model and visualise lines.
        '''
        self.createPointGraphics()
        # customButton end

# main start
def main():
    '''
    The entry point for the application, handle application arguments and initialise the 
    GUI.
    '''
    
    app = QtGui.QApplication(sys.argv)

    w = ReadMeshDlg()
    w.show()

    sys.exit(app.exec_())
# main end

if __name__ == '__main__':
    main()
