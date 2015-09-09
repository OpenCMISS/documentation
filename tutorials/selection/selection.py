#!/usr/bin/python
# -*- coding: utf-8 -*-

import sys
try:
    from PySide import QtGui
except ImportError:
    from PyQt4 import QtGui
from selection_ui import Ui_SelectionDlg

from opencmiss.zinc.context import Context
from opencmiss.zinc.glyph import Glyph

class SelectionDlg(QtGui.QWidget):
    '''
    Create a subclass of QWidget for our application.  We could also have derived this 
    application from QMainApplication to give us a menu bar among other things, but a
    QWidget is sufficient for our purposes.
    '''
    
    def __init__(self, parent=None):
        '''
        Initiaise the MaterialsDlg first calling the QWidget __init__ function.
        '''
        QtGui.QWidget.__init__(self, parent)
        
        # Using composition to include the visual element of the GUI.
        self._ui = Ui_SelectionDlg()
        self._ui.setupUi(self)
        self.setWindowIcon(QtGui.QIcon(":/cmiss_icon.ico"))
        self.resize(620, 440)
        
        self._context = Context('selection')
        self._ui.zincWidget.setContext(self._context)
        
        # Define some standard glyphs and materials
        self._ui.zincWidget.defineStandardGlyphs()
        self._ui.zincWidget.defineStandardMaterials()
        
        self._readCube()
        self._showCube()
        
    def _readCube(self):
        '''
        Read in a basic cube mesh from an exformat file.
        '''
        region = self._context.getDefaultRegion()
        region.readFile('cube.exformat')
    
    def _showCube(self):
        '''
        Show the cube with surfaces and node points.
        '''
        region = self._context.getDefaultRegion()
        scene = region.getScene()
        field_module = region.getFieldmodule()
        finite_element_field = field_module.findFieldByName('coordinates')
        
        material_module = self._context.getMaterialmodule()
        blue_material = material_module.findMaterialByName('blue')
        red_material = material_module.findMaterialByName('red')
        gold_material = material_module.findMaterialByName('gold')
        silver_material = material_module.findMaterialByName('silver')
        yellow_material = material_module.findMaterialByName('yellow')
        green_material = material_module.findMaterialByName('green')
    
        # We use the beginChange and endChange to wrap any immediate changes this will
        # streamline the rendering of the scene.
        scene.beginChange()
        
        lines = scene.createGraphicsLines()
        lines.setCoordinateField(finite_element_field)
        lines.setMaterial(yellow_material)
        lines.setSelectedMaterial(green_material)

        surface = scene.createGraphicsSurfaces()
        surface.setCoordinateField(finite_element_field)
        surface.setMaterial(blue_material)
        surface.setSelectedMaterial(red_material)
        
        
        nodes = scene.createGraphicsPoints()
        nodes.setCoordinateField(finite_element_field)
        nodes.setFieldDomainType(finite_element_field.DOMAIN_TYPE_NODES)
        nodes.setMaterial(gold_material)
        nodes.setSelectedMaterial(silver_material)
        attributes = nodes.getGraphicspointattributes()
        attributes.setGlyphShapeType(Glyph.SHAPE_TYPE_SPHERE)
        attributes.setBaseSize(0.1)
        
        # Let the scene render the scene.
        scene.endChange()

# main start
def main():
    '''
    The entry point for the application, handle application arguments and initialise the 
    GUI.
    '''
    
    app = QtGui.QApplication(sys.argv)

    w = SelectionDlg()
    w.show()

    sys.exit(app.exec_())
# main end

if __name__ == '__main__':
    main()
