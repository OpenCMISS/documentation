#!/bin/sh
#
# This shell script is used to invoke the Latex_Makefile for general 
# documents. It should be copied into the individual document directory
# as a new document is created. It is used to pass document specific 
# parameters to the makefile. NOTE that if parameters may be omitted
# by simply deleting them from the "make" command line.
#
# Usage:
#   Latex_make.sh [makefile_options] 
# Created:
#   Martyn Nash, 22 March 1996
# Updates:
#
# Changable options:
#
# This is the overall name of the document
MY_MAINFILE=bionotes
#
# These are the names of the tex sources for the document. If there is
# more than one source quotation (") marks must be used around the
# individual sources seperated by spaces
MY_TEX_SRC="titlepage.tex "\
"biophysics/biophysics.tex "\
"cardiac_electrophysiology/cardiac_electrophysiology.tex "\
"electrocardiology/electrocardiology.tex "\
"tissue_mechanics/tissue_mechanics.tex "\
"instrumentation/instrumentation.tex "\
"references.tex"
#
# The names of the eps/figs/(gnu)plot files that go into the document. 
# if there are none then leave after the ='s sign blank.
MY_EPS_SRC="biophysics/epsfiles/*.eps "\
"electrocardiology/epsfiles/*.eps"
MY_FIG_SRC="biophysics/figs/*.fig "\
"cardiac_electrophysiology/figs/*.fig "\
"electrocardiology/figs/*.fig"
MY_PLOT_SRC=
#
# The name of the directory to place the html version of the document.
# Note that the actual file will be placed in the directory
# MY_HTMLUPDATE_DIR/MY_MAINFILE with filename MY_MAINFILE.html
MY_HTMLUPDATE_DIR=${OPENCMISS_ROOT}/www/help
#
# This next option should be "user" if the document is intended for
# general users or "programmer" if the document is intended for 
# cmiss programmers
MY_HTMLIDXTYPE=user
#
# The name of the bibliography database for the document
MY_BIBS=${OPENCMISS_ROOT}/documentation/notes/references/opencmiss_references.bib
#
# The name of the printer to print the document to
MY_PRINTER=
#
# Below this line should not need changing
#
# Actual make command:
#
make -f ${OPENCMISS_ROOT}/documentation/notes/latex/Latex_Makefile $* \
	MAINFILE=$MY_MAINFILE \
	TEX_SRC="$MY_TEX_SRC" \
	EPS_SRC="$MY_EPS_SRC" \
	FIG_SRC="$MY_FIG_SRC" \
	PLOT_SRC="$MY_PLOT_SRC" \
	HTMLUPDATE_DIR=$MY_HTMLUPDATE_DIR \
	HTMLIDXTYPE=$MY_HTMLIDXTYPE \
	BIBS=$MY_BIBS \
	PRINTER=$MY_PRINTER
