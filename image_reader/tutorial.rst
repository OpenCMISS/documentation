
######################
Tutorial: Image Reader
######################

The Image Reader application is designed to illustrate how to read an image into an image field.

Overview
========

The Zinc library uses streams to read in data from disk or memory.  The image reader application shows
how to read in an image from disk using the Zinc library stream API.  The same process is followed when 
reading an image in from memory, the only difference is the stream resource type that is used.

The souce code used in this tutorial is available from the `physiome project svn server <https://svn.physiomeproject.org/svn/cmiss/zinc/bindings/examples/trunk/python/image_reader/>`_.

The Code
========

Here is the code for reading in an image from disk:

.. literalinclude:: image_reader.py
  :linenos:
  :start-after: # main start
  :end-before: # main end

**Line 6** creates the Zinc context we must create one of these to get any other objects from this context.

To create an image field we first must get the default region from the context (**Line 12**) and then
we can get the field module for that region (**Line 16**).  From the field module we can create any fields required, in our
case we want an image field.

An image field is created over a domain but if we don't supply one the create image field method will construct 
one for us.  The constructed domain will be over xi space [0-1]x[0-1]x[0-1] irrespective of the dimensionality of the
image data.  It is possible to construct a domain better suited for our image data but we will leave this for a later
tutorial.

**Line 21** creates an image field and implicitly a domain for it.  **Line 22** sets the name of the image field to 'texture',
naming a field can be useful if we wish to find it by name later.

To read the data into the image field we need to create a stream information object which will hold all the information 
required to read in the image.  **Line 26** creates the stream information object and **line 28** sets the image file format to png.  

It is not absolutely necessary to set the image file format as some guesswork will take place if it is not set, although 
reading of the image data will fail if the image file format can not be determined.  **Line 30** creates a 
file resource to read in the file from disk.  Alternatively we could use a memory resource this type of resource is typically 
used when reading an image in from a compressed archive.  The uncompressed image is held in memory which we can pass through directly.

All the information required to read the image is now in place and **line 33** actually reads in the image data.  We can check the result of
the read by comparing the return value with CMISS_OK, which currently has the literal value of 1.

When we execute this application, if everything went well, we should see::

   Image successfully read into image field.








