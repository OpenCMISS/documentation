# -*- coding: utf-8 -*-

# Form implementation generated from reading ui file 'read_mesh.ui'
#
# Created: Wed Apr 30 11:01:09 2014
#      by: pyside-uic 0.2.15 running on PySide 1.2.1
#
# WARNING! All changes made in this file will be lost!

from PySide import QtCore, QtGui

class Ui_ReadMeshDlg(object):
    def setupUi(self, ReadMeshDlg):
        ReadMeshDlg.setObjectName("ReadMeshDlg")
        ReadMeshDlg.resize(605, 375)
        icon = QtGui.QIcon()
        icon.addPixmap(QtGui.QPixmap(":/cmiss_icon.ico"), QtGui.QIcon.Normal, QtGui.QIcon.Off)
        ReadMeshDlg.setWindowIcon(icon)
        self.gridLayout = QtGui.QGridLayout(ReadMeshDlg)
        self.gridLayout.setObjectName("gridLayout")
        self.verticalLayout = QtGui.QVBoxLayout()
        self.verticalLayout.setObjectName("verticalLayout")
        self._zincwidget = ZincWidget(ReadMeshDlg)
        sizePolicy = QtGui.QSizePolicy(QtGui.QSizePolicy.Preferred, QtGui.QSizePolicy.Preferred)
        sizePolicy.setHorizontalStretch(0)
        sizePolicy.setVerticalStretch(1)
        sizePolicy.setHeightForWidth(self._zincwidget.sizePolicy().hasHeightForWidth())
        self._zincwidget.setSizePolicy(sizePolicy)
        self._zincwidget.setObjectName("_zincwidget")
        self.verticalLayout.addWidget(self._zincwidget)
        self.timeSlider = QtGui.QSlider(ReadMeshDlg)
        self.timeSlider.setMaximum(100)
        self.timeSlider.setOrientation(QtCore.Qt.Horizontal)
        self.timeSlider.setObjectName("timeSlider")
        self.verticalLayout.addWidget(self.timeSlider)
        self.horizontalLayout = QtGui.QHBoxLayout()
        self.horizontalLayout.setObjectName("horizontalLayout")
        spacerItem = QtGui.QSpacerItem(40, 20, QtGui.QSizePolicy.Expanding, QtGui.QSizePolicy.Minimum)
        self.horizontalLayout.addItem(spacerItem)
        self.customButton = QtGui.QPushButton(ReadMeshDlg)
        self.customButton.setObjectName("customButton")
        self.horizontalLayout.addWidget(self.customButton)
        self.quitButton = QtGui.QPushButton(ReadMeshDlg)
        self.quitButton.setObjectName("quitButton")
        self.horizontalLayout.addWidget(self.quitButton)
        self.verticalLayout.addLayout(self.horizontalLayout)
        self.gridLayout.addLayout(self.verticalLayout, 0, 0, 1, 1)

        self.retranslateUi(ReadMeshDlg)
        QtCore.QObject.connect(self.quitButton, QtCore.SIGNAL("clicked()"), ReadMeshDlg.close)
        QtCore.QObject.connect(self.customButton, QtCore.SIGNAL("clicked()"), ReadMeshDlg.customButton)
        QtCore.QMetaObject.connectSlotsByName(ReadMeshDlg)

    def retranslateUi(self, ReadMeshDlg):
        ReadMeshDlg.setWindowTitle(QtGui.QApplication.translate("ReadMeshDlg", "Read Mesh", None, QtGui.QApplication.UnicodeUTF8))
        self.customButton.setText(QtGui.QApplication.translate("ReadMeshDlg", "Custom", None, QtGui.QApplication.UnicodeUTF8))
        self.quitButton.setText(QtGui.QApplication.translate("ReadMeshDlg", "&Quit", None, QtGui.QApplication.UnicodeUTF8))

from zincwidget import ZincWidget
import icons_rc
