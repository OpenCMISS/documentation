# -*- coding: utf-8 -*-

# Form implementation generated from reading ui file 'finite_element_creation.ui'
#
# Created: Fri Sep 27 15:34:25 2013
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

class Ui_FiniteElementCreationDlg(object):
    def setupUi(self, FiniteElementCreationDlg):
        FiniteElementCreationDlg.setObjectName(_fromUtf8("FiniteElementCreationDlg"))
        FiniteElementCreationDlg.resize(400, 300)
        icon = QtGui.QIcon()
        icon.addPixmap(QtGui.QPixmap(_fromUtf8(":/cmiss_icon.ico")), QtGui.QIcon.Normal, QtGui.QIcon.Off)
        FiniteElementCreationDlg.setWindowIcon(icon)
        self.gridLayout = QtGui.QGridLayout(FiniteElementCreationDlg)
        self.gridLayout.setObjectName(_fromUtf8("gridLayout"))
        self.pushButton = QtGui.QPushButton(FiniteElementCreationDlg)
        self.pushButton.setObjectName(_fromUtf8("pushButton"))
        self.gridLayout.addWidget(self.pushButton, 1, 1, 1, 1)
        spacerItem = QtGui.QSpacerItem(40, 20, QtGui.QSizePolicy.Expanding, QtGui.QSizePolicy.Minimum)
        self.gridLayout.addItem(spacerItem, 1, 0, 1, 1)
        self._zincWidget = ZincWidget(FiniteElementCreationDlg)
        self._zincWidget.setObjectName(_fromUtf8("_zincWidget"))
        self.gridLayout.addWidget(self._zincWidget, 0, 0, 1, 2)

        self.retranslateUi(FiniteElementCreationDlg)
        QtCore.QObject.connect(self.pushButton, QtCore.SIGNAL(_fromUtf8("clicked()")), FiniteElementCreationDlg.close)
        QtCore.QMetaObject.connectSlotsByName(FiniteElementCreationDlg)

    def retranslateUi(self, FiniteElementCreationDlg):
        FiniteElementCreationDlg.setWindowTitle(_translate("FiniteElementCreationDlg", "Finite Element Creation", None))
        self.pushButton.setText(_translate("FiniteElementCreationDlg", "&Quit", None))

from zinc_widget import ZincWidget
import icons_rc
