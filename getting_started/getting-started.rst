###########################
Getting Started with PyZinc
###########################

PyZinc is the Python bindings for the Zinc library.  The Zinc library is an advanced OpenGL visualisation library.  
It's main use is for visualising Finite Element Models. This document assumes that you have already successfully installed
Zinc and PyZinc on your machine following the instructions in [installation] document. 

What You Need
=============

We require two files that are available from the Physiome project svn repository.  Right click on these links and download the text files to your
machine. 

* `Example PyZinc script <https://svn.physiomeproject.org/svn/cmiss/zinc/bindings/examples/trunk/python/getting_started/getting_started.py>`__
* `Example Data <https://svn.physiomeproject.org/svn/cmiss/zinc/bindings/examples/trunk/python/getting_started/example.exfile>`__

Executing the Script
====================

Now we would like to execute this script to see that Zinc is working for us.  Follow the instructions that are applicable for your platform.
The exact names of the directories may not match what is on your own computer you will need to change them as appropriate.

Windows
-------

Using the Command application navigate to the directory where you downloaded the required scripts to and execute the python script with Python, like so::

  cd C:\Users\Me\Downloads
  python getting_started.py

Mac
---

Open the Terminal application and navigate to the directory where you downloaded the required scripts and execute the python script with Python, like so::

  cd Downloads
  python getting_started.py 

Linux
-----

Open an application to get a command prompt and navigate to the directory where you downloaded the required scripts and execute the python script with Python, like so::

  cd downloads
  chmod 755 getting_started.py
  python getting_started.py

  
If Zinc is installed and running correctly then you should see output in the console window something very similar to::

	1 [1.091342932329548, 1.8162332528565992, -0.4363323129985822]
	2 [1.0455688593265615, 1.844594853201507, 5.131268000863329]
	3 [0.8934782703535451, 1.8257889305112682, 4.5596726708351865]
	4 [0.8526299403448955, 1.7859736069501475, 4.132067004096575]
	5 [0.823688724884815, 1.7655096214705146, 3.490658503988659]
	6 [0.7721063084478827, 1.7655096214705142, 2.635447170511437]
	7 [0.7107744758720987, 1.7859736069501477, 1.9940386704035213]
	8 [0.7360884908549459, 1.8170622842512965, 1.5664417303111704]
	9 [0.8353485671058636, 1.8315048838115495, 0.9948507636061574]
	10 [1.0379912746644158, 1.8118699297266134, 0.27925704364222276]
	...
 
This simple script has loaded the 60-element prolate heart model and evaluated and printed the value of the coordinate field at the centre of each element. Have a read of it and as needed look up the API documentation to learn how each API function works.
 
Congratulations, you now have a functioning Zinc and PyZinc installation.  You can now move onto understanding some of the more advanced features that are offered.
 