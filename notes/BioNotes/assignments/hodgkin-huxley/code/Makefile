# Standard Makefile for hpc1 (Chris Bradley, October 1996)
#
# ----------------------------------------------------------------------------

# Specify what sort of instruction set to use i.e. -mips#

INSTRUCTION = -mips4

# Specify what application binary interface (ABI) to use i.e. -32, -n32 or -64

ABI = -n32

# Sepcify what level of optimisation to use i.e. -O#, 0 <= # <= 3

OPTIMISATION = 

# Specify what chip the program should be scheduled for i.e. -r5000, -r8000, 
# -r10000

SCHEDULING = -r5000

# Specify the Fortran compiler (FC), the C compiler (CC) and linker (LD) to use

FC = f77
CC = cc
LD = f77

#
# ----------------------------------------------------------------------------

# Specify and Fortran compiler flags (FFLAGS), C compiler flags (CFLAGS) or 
# link flags (LFLAGS) e.g. -mp on compile and link for multiprocessing 
# directives to be enabled.

FFLAGS = -g
CFLAGS =
LFLAGS = -g -L/usr/local/lib

# Specify any libraries to link to e.g. -lcomplib.sgimath

LIBRARIES = -lgx_n32 -lMrm -lXmu -lXm -lXt -lX11 -lnag_n32 -lcomplib.sgimath

# Specify the name of the final executable

EXECUTABLE = hh

# Specify the names of the objects of the executable

OBJECTS = hh.o

# ----------------------------------------------------------------------------
#

# Modify the default compiler rules 

.SUFFIXES: .f .c

.f.o:
	$(FC) -o $@ $(SCHEDULING) $(ABI) $(INSTRUCTION) $(OPTIMISATION) $(FFLAGS) -c $*.f

.c.o:
	$(CC) -o $@ $(SCHEDULING) $(ABI) $(INSTRUCTION) $(OPTIMISATION) $(CFLAGS) -c $*.c

$(EXECUTABLE) : $(OBJECTS)
	$(LD) $(SCHEDULING) $(ABI) $(INSTRUCTION) $(OBJECTS) -o $@ $(LFLAGS) $(LIBRARIES)

# Place the list of dependencies for the objects here.
#
# ----------------------------------------------------------------------------

hh.o	:	hh.f

# ----------------------------------------------------------------------------
#
# clean and clobber for removing objects and executable.

clean:
	rm -f $(OBJECTS)

clobber: clean
	rm -f $(EXECUTABLE)
