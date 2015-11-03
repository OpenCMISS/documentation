OpenCMISS-Zinc Library and API Usage
====================================

The Library
-----------

OpenCMISS-Zinc is delivered as a single shared object / dynamic linked library for Windows, Mac OS X and Linux, but can also be built as a static library. It has native C and C++ APIs, and language bindings are also provided for Python giving an API very similar to C++.

The Zinc library is *not* thread safe: you must not call API functions on objects from the same Zinc *Context* from different threads concurrently.

Object Method Interface
-----------------------

When using the Zinc API, apart from creating the initial *Context* object, all actions are performed by calling methods (functions) on existing objects in object-oriented style. This includes methods to create or get further objects. This also applies to the C API where the function name is prefixed by the type name, and the first argument is always the object. All data used by a function is passed in the arguments: there is no other hidden 'global' data. Hence it is possible to use multiple Context objects, however users must never pass an object from one Context to a method on an object from a different Context.

API methods which get or create objects return a 'handle' to the object which is either valid or invalid. In the C API the handles are pointers, and an invalid handle has a NULL (0) value, valid is non-NULL. C++ and Python return 'smart' handles to objects which automate reference counting (see below), and these are valid if their ``isValid()`` method returns true.

API methods which perform actions but do not return an object handle return integer values indicating success or failure. To check the result users must compare the value against error/status code enumerated values (``OK``, ``ERROR_ARGUMENT``, ``ERROR_GENERAL`` etc.) to ensure source compatibility in future, since a change in the numerical value of the ``OK`` enumeration is planned. Some error codes are benign; for example adding a node to a group returns ``OK`` if the node was added, ``ERROR_ALREADY_EXISTS`` if it was already in the group. Similarly, removing a node from a group returns ``OK`` if the node was removed, ``ERROR_NOT_FOUND`` if it wasn't in the group.

Some internal errors and warnings are written to the console and these are often important for determining why high level functions failed. For example, the error message may explain what part of an input file is bad or incompatible when reading it into a Zinc object. The returned status code will only give a broad categorisation of the failure.

Naming Conventions
------------------

The Zinc Library API uses a consistent, if somewhat unique, class naming convention. Zinc base class names are always made into a single word, even if it is a compound of several words. Derived classes start with the base class name, followed by the specialisations as separate words. This came about because the latter case of derived classes was standardised first, and the need to use certain base class names as qualifiers for other types arose. Examples: A *FieldAdd* (two words) is a derived *Field* type which performs the *Add* operation; a *Fieldcache* (one word) is not a *Field* but a *cache* for evaluating fields.

Methods for creating or getting objects of different classes always give the full qualified name of the class. For example ``fieldmodule.createFieldAdd(a, b)`` or ``fieldmodule.findFieldByName(name)``. In contrast, casting to a derived type does not require the base type to be respecified, e.g. ``field.castImage()`` (not castFieldImage).

Almost all enumerated types are defined within the parent class which they logically belong with. For example, the element shape type belongs to the *Element* class, hence it is ``Element::ShapeType`` in C++. This ownership extends to API methods on the parent class which do not require the class qualifier to be repeated (mainly an issue in the C API where we can call ``cmzn_element_get_shape_type(element)`` without repeating the word 'element').

Enumerated values are capitalised and begin with the full name of the enumerated type separated with underscores if separate words, followed by the distinguising difference. For example ``Element::SHAPE_TYPE_CUBE``.

Reference Counting and Object Lifetimes
---------------------------------------

Zinc uses reference counting to manage object lifetimes, ensuring that objects are not destroyed while in use. If a handle to an object is returned by an API method the reference count is incremented. In C++ and Python, smart handles automate the release of references, but in C it is very important to call the matching ``~destroy()`` function to destroy/release each returned handle.

Usually, objects are destroyed when their reference count drops to zero, but two other strategies are employed in Zinc to manage lifetimes, depending on the class of object:

 #. Objects organised in *modules* (Field, Glyph, Material, Tessellation, Spectrum etc.) can individually have their 'managed' flag set to true so they exist in their module even when no external references are held. This is needed for fields read in from file, which can later be found from their module by name or other attributes. New objects are created with their managed flag set to false, giving the default lifetime which destroys the object when no external references to it are held. To destroy such objects requires setting their managed flag to false and destroying all user-held references to them.
 #. A few objects can be destroyed via methods on their owning object, including Element (owner: Mesh), Node (owner: Nodeset), Graphics (owner: Scene). If the owning object's method is called to destroy these objects, handles to them remain safe but all methods on them fail except the ``~destroy()`` method (which destroys the *handle*, removing a reference). Note that nodes cannot be destroyed while in use by elements.

A small number of default objects cannot be destroyed and exist until the Zinc Context is destroyed.

Passing Arrays
--------------

C and C++ arrays are effectively pointers, and are thus not aware of their sizes. All Zinc APIs with variable-length array arguments -- whether for input or output -- supply the integer size followed by the array pointer.

API methods which take or return arrays of fixed length do not specify the size. Where specialised variants for different sizes are expected to exist, the method name has the size as a suffix e.g. Material's ``getAttributeReal3(attribute, valuesOut3)``. Sometimes these method names have a suffix explaining the meaning of the components e.g. Sceneviewer's ``setBackgroundColourRGB(valuesIn3)``. In all cases the fixed-size array argument name has the size as a suffix as in these examples.

Python lists are used to pass arrays in and out of the Zinc Python API and since these know their sizes they need not be specified when passing into Zinc. However, when getting arrays out of Zinc in Python the requested size must be passed in if it is present in the C/C++ APIs. For more details refer to the Python-specific documentation for using Zinc.

Change Notification
-------------------

When Zinc library objects are modified, messages are communicated to other objects that depend on them. These change messages propagate throughout the system to ensure interactive applications built on Zinc appear dynamic. As an illustration, domain and field changes are sent to scenes, if graphics are affected scene changes are sent to sceneviewers which notify clients to redraw in their windows.

For efficiency, users of the Zinc API should minimise the number of these messages by enclosing multiple changes to objects with calls to ``beginChange()`` and matching ``endChange()`` methods. These calls can be nested, and only after the final ``endChange()`` is a change message sent to clients. For a number of objects, particularly those organised in *modules* (Field, Material etc.) the parent object or module is responsible for messaging for all the objects it owns and its begin/end change methods must be called. Region objects also have hierarchical begin/end change methods which temporarily disable change messages for the entire region tree.

The Zinc API includes several *notifier* objects for requesting callbacks for changes to objects. These include Fields (from Fieldmodule, including Nodeset and Mesh changes), selection (from Scene), Sceneviewer (from itself, for redraw and view change) and time (from Timekeeper). These assist building interactive applications and modular dialogs.
