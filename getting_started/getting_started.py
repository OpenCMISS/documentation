#!/usr/bin/python
"""
PyZinc examples

This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
"""
from opencmiss.zinc.context import Context
from opencmiss.zinc.status import OK

context = Context("Example")
region = context.getDefaultRegion()
region.readFile("example.exfile")
fieldmodule = region.getFieldmodule()
field = fieldmodule.findFieldByName("coordinates")
cache = fieldmodule.createFieldcache()
xi = [0.5, 0.5, 0.5]
mesh = fieldmodule.findMeshByDimension(3)
el_iter = mesh.createElementiterator()
element = el_iter.next()
while element.isValid():
    cache.setMeshLocation(element, xi)
    result, outValues = field.evaluateReal(cache, 3)
    # Check result for errors, Use outValues
    if result == OK:
        print( element.getIdentifier(), outValues )
    element = el_iter.next()
