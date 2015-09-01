# -*- coding: utf-8 -*-

# Form implementation generated from reading ui file 'axis_viewer.ui'
#
# Created: Mon Sep 30 12:24:06 2013
#      by: pyside-uic 0.2.14 running on PySide 1.1.2
#
# WARNING! All changes made in this file will be lost!

from PySide import QtCore, QtGui

class Ui_AxisViewerDlg(object):
    def setupUi(self, AxisViewerDlg):
        AxisViewerDlg.setObjectName("AxisViewerDlg")
        AxisViewerDlg.resize(400, 300)
        icon = QtGui.QIcon()
        icon.addPixmap(QtGui.QPixmap(":/cmiss_icon.ico"), QtGui.QIcon.Normal, QtGui.QIcon.Off)
        AxisViewerDlg.setWindowIcon(icon)
        self.gridLayout = QtGui.QGridLayout(AxisViewerDlg)
        self.gridLayout.setObjectName("gridLayout")
        self.pushButton = QtGui.QPushButton(AxisViewerDlg)
        self.pushButton.setObjectName("pushButton")
        self.gridLayout.addWidget(self.pushButton, 1, 1, 1, 1)
        spacerItem = QtGui.QSpacerItem(40, 20, QtGui.QSizePolicy.Expanding, QtGui.QSizePolicy.Minimum)
        self.gridLayout.addItem(spacerItem, 1, 0, 1, 1)
        self._zincwidget = ZincWidget(AxisViewerDlg)
        self._zincwidget.setObjectName("_zincwidget")
        self.gridLayout.addWidget(self._zincwidget, 0, 0, 1, 2)

        self.retranslateUi(AxisViewerDlg)
        QtCore.QObject.connect(self.pushButton, QtCore.SIGNAL("clicked()"), AxisViewerDlg.close)
        QtCore.QMetaObject.connectSlotsByName(AxisViewerDlg)

    def retranslateUi(self, AxisViewerDlg):
        AxisViewerDlg.setWindowTitle(QtGui.QApplication.translate("AxisViewerDlg", "Axis Viewer", None, QtGui.QApplication.UnicodeUTF8))
        self.pushButton.setText(QtGui.QApplication.translate("AxisViewerDlg", "&Quit", None, QtGui.QApplication.UnicodeUTF8))

from zincwidget import ZincWidget
import icons_rc
