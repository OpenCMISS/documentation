# -*- coding: utf-8 -*-

# Form implementation generated from reading ui file 'selection.ui'
#
# Created: Wed Jan  8 15:49:05 2014
#      by: pyside-uic 0.2.14 running on PySide 1.1.2
#
# WARNING! All changes made in this file will be lost!

from PySide import QtCore, QtGui

class Ui_SelectionDlg(object):
    def setupUi(self, SelectionDlg):
        SelectionDlg.setObjectName("SelectionDlg")
        SelectionDlg.resize(400, 300)
        icon = QtGui.QIcon()
        icon.addPixmap(QtGui.QPixmap(":/cmiss_icon.ico"), QtGui.QIcon.Normal, QtGui.QIcon.Off)
        SelectionDlg.setWindowIcon(icon)
        self.gridLayout = QtGui.QGridLayout(SelectionDlg)
        self.gridLayout.setObjectName("gridLayout")
        self.quitButton = QtGui.QPushButton(SelectionDlg)
        self.quitButton.setObjectName("quitButton")
        self.gridLayout.addWidget(self.quitButton, 1, 1, 1, 1)
        spacerItem = QtGui.QSpacerItem(40, 20, QtGui.QSizePolicy.Expanding, QtGui.QSizePolicy.Minimum)
        self.gridLayout.addItem(spacerItem, 1, 0, 1, 1)
        self.zincWidget = ZincWidget(SelectionDlg)
        self.zincWidget.setObjectName("zincWidget")
        self.gridLayout.addWidget(self.zincWidget, 0, 0, 1, 2)

        self.retranslateUi(SelectionDlg)
        QtCore.QObject.connect(self.quitButton, QtCore.SIGNAL("clicked()"), SelectionDlg.close)
        QtCore.QMetaObject.connectSlotsByName(SelectionDlg)

    def retranslateUi(self, SelectionDlg):
        SelectionDlg.setWindowTitle(QtGui.QApplication.translate("SelectionDlg", "Selection", None, QtGui.QApplication.UnicodeUTF8))
        self.quitButton.setText(QtGui.QApplication.translate("SelectionDlg", "&Quit", None, QtGui.QApplication.UnicodeUTF8))

from zincwidget import ZincWidget
import icons_rc
