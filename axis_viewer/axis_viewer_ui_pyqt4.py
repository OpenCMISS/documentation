# -*- coding: utf-8 -*-

# Form implementation generated from reading ui file 'axis_viewer.ui'
#
# Created: Mon Sep 30 12:24:20 2013
#      by: PyQt4 UI code generator 4.10.3
#
# WARNING! All changes made in this file will be lost!

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

class Ui_AxisViewerDlg(object):
    def setupUi(self, AxisViewerDlg):
        AxisViewerDlg.setObjectName(_fromUtf8("AxisViewerDlg"))
        AxisViewerDlg.resize(400, 300)
        icon = QtGui.QIcon()
        icon.addPixmap(QtGui.QPixmap(_fromUtf8(":/cmiss_icon.ico")), QtGui.QIcon.Normal, QtGui.QIcon.Off)
        AxisViewerDlg.setWindowIcon(icon)
        self.gridLayout = QtGui.QGridLayout(AxisViewerDlg)
        self.gridLayout.setObjectName(_fromUtf8("gridLayout"))
        self.pushButton = QtGui.QPushButton(AxisViewerDlg)
        self.pushButton.setObjectName(_fromUtf8("pushButton"))
        self.gridLayout.addWidget(self.pushButton, 1, 1, 1, 1)
        spacerItem = QtGui.QSpacerItem(40, 20, QtGui.QSizePolicy.Expanding, QtGui.QSizePolicy.Minimum)
        self.gridLayout.addItem(spacerItem, 1, 0, 1, 1)
        self._zincwidget = ZincWidget(AxisViewerDlg)
        self._zincwidget.setObjectName(_fromUtf8("_zincwidget"))
        self.gridLayout.addWidget(self._zincwidget, 0, 0, 1, 2)

        self.retranslateUi(AxisViewerDlg)
        QtCore.QObject.connect(self.pushButton, QtCore.SIGNAL(_fromUtf8("clicked()")), AxisViewerDlg.close)
        QtCore.QMetaObject.connectSlotsByName(AxisViewerDlg)

    def retranslateUi(self, AxisViewerDlg):
        AxisViewerDlg.setWindowTitle(_translate("AxisViewerDlg", "Axis Viewer", None))
        self.pushButton.setText(_translate("AxisViewerDlg", "&Quit", None))

from zincwidget import ZincWidget
import icons_rc
