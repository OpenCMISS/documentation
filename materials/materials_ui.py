# -*- coding: utf-8 -*-

# Form implementation generated from reading ui file 'materials.ui'
#
# Created: Fri Sep 27 16:23:37 2013
#      by: PyQt4 UI code generator 4.10.3
#
# WARNING! All changes made in this file will be lost!

try:
    from PySide import QtCore, QtGui
except ImportError:
    from PyQt4 import QtCore, QtGui

try:
    _fromUtf8 = QtCore.QString.fromUtf8
except AttributeError:
    def _fromUtf8(s):
        return s

try:
    _encoding = QtGui.QApplication.UnicodeUTF8
    def _translate(context, text, disambig):
        return QtGui.QApplication.translate(context, text, disambig, _encoding)
except AttributeError:
    def _translate(context, text, disambig):
        return QtGui.QApplication.translate(context, text, disambig)

class Ui_MaterialsDlg(object):
    def setupUi(self, MaterialsDlg):
        MaterialsDlg.setObjectName(_fromUtf8("MaterialsDlg"))
        MaterialsDlg.resize(400, 300)
        icon = QtGui.QIcon()
        icon.addPixmap(QtGui.QPixmap(_fromUtf8(":/cmiss_icon.ico")), QtGui.QIcon.Normal, QtGui.QIcon.Off)
        MaterialsDlg.setWindowIcon(icon)
        self.gridLayout = QtGui.QGridLayout(MaterialsDlg)
        self.gridLayout.setObjectName(_fromUtf8("gridLayout"))
        self.pushButton = QtGui.QPushButton(MaterialsDlg)
        self.pushButton.setObjectName(_fromUtf8("pushButton"))
        self.gridLayout.addWidget(self.pushButton, 1, 1, 1, 1)
        spacerItem = QtGui.QSpacerItem(40, 20, QtGui.QSizePolicy.Expanding, QtGui.QSizePolicy.Minimum)
        self.gridLayout.addItem(spacerItem, 1, 0, 1, 1)
        self._zincWidget = ZincWidget(MaterialsDlg)
        self._zincWidget.setObjectName(_fromUtf8("_zincWidget"))
        self.gridLayout.addWidget(self._zincWidget, 0, 0, 1, 2)

        self.retranslateUi(MaterialsDlg)
        QtCore.QObject.connect(self.pushButton, QtCore.SIGNAL(_fromUtf8("clicked()")), MaterialsDlg.close)
        QtCore.QMetaObject.connectSlotsByName(MaterialsDlg)

    def retranslateUi(self, MaterialsDlg):
        MaterialsDlg.setWindowTitle(_translate("MaterialsDlg", "Materials", None))
        self.pushButton.setText(_translate("MaterialsDlg", "&Quit", None))

from zinc_widget import ZincWidget
import icons_rc
