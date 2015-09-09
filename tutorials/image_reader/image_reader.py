#!/usr/bin/python
"""
PyZinc examples

This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
"""
from opencmiss.zinc.context import Context

# main start
def main():
    '''
    The entry point for the application, handle application arguments.
    '''
    # Create the context
    context = Context("image")
    
    # Name of the file we intend to read in.
    image_name = 'drawing.png'
    
    # Get a handle to the root region
    default_region = context.getDefaultRegion()
    
    # The field module allows us to create a field image to 
    # store the image data into.
    field_module = default_region.getFieldmodule()
    
    # Create an image field, we don't specify the domain here for this
    # field even though it is a source field.  A temporary xi source field
    # is created for us.
    image_field = field_module.createFieldImage()
    image_field.setName('texture')
    
    # Create a stream information object that we can use to read the 
    # image file from the disk
    stream_information = image_field.createStreaminformationImage()
    # Set the format for the image we want to read
    stream_information.setFileFormat(stream_information.FILE_FORMAT_PNG)
    # We are reading in a file from the local disk so our resource is a file.
    stream_information.createStreamresourceFile(image_name)
    
    # Actually read in the image file into the image field.
    ret = image_field.read(stream_information)
    if ret == 1: # CMISS_OK has  the literal value 1
        print('Image successfully read into image field.')
    else:
        print('Error: failed to read image into image field.')
        
# main end

if __name__ == '__main__':
    main()

