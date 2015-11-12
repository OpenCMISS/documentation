The OpenCMISS-Zinc Data Model
=============================

The bulk of the OpenCMISS-Zinc Data Model can be considered as being in two layers. The first consists of objects which represent the model: principally domains which describe the body of the model, and fields which map it to quantities of interest. The second layer is the graphical representation which provides objects converting parts of the model into graphical primitives for display, plus those supporting OpenGL rendering and interaction.

Some patterns are used throughout the library. Many Zinc objects are containers which manage a set of uniquely labelled objects, with methods for finding those objects by label. A number of these container/manager objects are called *modules*, and these share common characteristics such as containing the named objects throughout their lifetimes, providing one or more default objects to set default behaviour for other parts of the library and supplying *iterators* for iterating over their objects. Some provide *notifiers* for informing client code of changes to any of the objects they manage, allowing smart user interfaces to be built with them. Other container classes with more specialised relationships to the objects they manage may not be called modules, but nevertheless share features such as providing iterators and notifiers.

Model Representation
--------------------

This section describes the main object types used for starting up and building models in Zinc.

Context
^^^^^^^

The *Context* is the first object that must be created when using the Zinc library. It is the only object not created by a method on another object; from it all other Zinc objects are created or obtained, directly or indirectly.

Multiple Context objects can be created, but API users must ensure that only Zinc objects stemming from the same Context are used together! Furthermore, the Context object must be kept by the user until the end of running Zinc, i.e. after releasing all other Zinc objects made from it.

The Context provides methods to get the default *Region* which is typically used as the root of a model tree, but independent root regions can also be created. The Context also provides methods to get the module objects which own all *Material*, *Spectrum*, *Tessellation* and other graphics-related objects as described later.

Region
^^^^^^

Consistently across OpenCMISS, a *Region* is a hierarchical container for storing parts of a model. It is analagous to folders/directories in a file system, with domains and fields corresponding to files. Each Region may have any number of child Regions, each with a unique name in their parent, forming a Region tree.

In Zinc, the Region class provides methods for creating, editing and navigating the region tree. Each Region has a *Fieldmodule* which provides the interface for creating and working with domains and fields making up the model in that Region. Each Region also has a *Scene* which owns graphics objects for visualising the model in the owning Region.

A default/root Region can be obtained from the Context which may suit many users. Alternatively, independent root regions can be created from the Context or any existing Region, which the user must maintain a reference to while in use.

Model Input/Output
""""""""""""""""""

The Region offers simple APIs for reading and writing model files by name. The most full-featured file format supported by Zinc is the EX format, described in :ref:`ex-file-format`. Input and output using the FieldML format is also supported with some limitations.

For more customised I/O, a *Streaminformation* object can be created from a Region. This allows multiple *Streamresources* including files and memory blocks to be specified with global or per-resource options, then read into the Region. This approach is more efficient when reading multiple files.

Fieldmodule
^^^^^^^^^^^

A *Fieldmodule* is an interface for creating and working with the model content of a Region. Its primary job is to manage the list of fields defined in the region, and it provides API for creating fields, finding fields by name, creating *Fieldcache* objects for evaluating fields, *Fielditerator* objects and more. It has methods to obtain the domain objects (*Mesh*, *Nodeset*) which describe the spaces over which fields are defined. The Fieldmodule has a method to define face and line elements for its meshes if needed.

Mesh and Element
^^^^^^^^^^^^^^^^

A *Mesh* declares a model domain of fixed dimension (>0) as a set of elements i.e. subspaces with simple shapes: cubes, tetrahedra, wedges in 3-D; squares, triangles in 2-D; lines in 1-D. The Zinc Library is currently limited to having three meshes per region, one for containing three dimensional elements, one for 2-D and one for 1-D. Hence meshes can be found by dimension from the Fieldmodule. If elements have face elements defined, they exist in the next lower dimension mesh in the same region.

The Mesh class has methods for creating and destroying elements, finding elements by identifier, creating *Elementiterator* objects for iterating over elements and more. Specialised element group fields (see later) allow subsets of meshes to be defined and from these derived *MeshGroup* objects can be obtained which support all the base Mesh API for iteration, query and so on.

Each *Element* in a Mesh has a unique non-negative integer identifier, and a shape consistent with the mesh dimension. Elements may have finite element fields (see later) defined on them by applying an *Elementbasis* (basis/shape functions) with parameters mapped from local nodes listed in the element (plus other methods). Elements are created from *Elementtemplate* objects which describe the shape and how fields are defined on it. An Elementtemplate can also be merged into an existing Element to define additional fields on it.

Nodeset and Node
^^^^^^^^^^^^^^^^

A *Nodeset* is the zero dimensional equivalent of a Mesh, which owns a set of nodes which are typically interpreted as points in space. Nodesets are obtained from a Region's Fieldmodule. Zinc is currently limited to having 2 nodesets per region: ``NODES`` which are able to supply finite element field parameters for interpolation over elements, and ``DATAPOINTS`` for other point data.

The Nodeset provides methods for creating and destroying nodes, finding nodes by identifier, creating *Nodeiterator* objects for iterating over nodes and more. Specialised node group fields (see later) allow subsets of Nodeset domains to be defined and from these derived *NodesetGroup* objects can be obtained which support all the base Nodeset API for iteration, query and so on.

Each *Node* has a unique non-negative integer identifier and can have finite element field parameters stored at it, including real values, derivatives, versions. Strings can be stored at nodes using 'stored string' fields, and 'stored mesh location' fields allow nodes to store locations in a mesh. Node field parameters can be arrays indexed by time (using a *Timesequence*) for time-varying fields.

Nodes are created in the parent Nodeset using *Nodetemplate* objects which describe the fields to be defined and what types of parameters to store for them. A Nodetemplate can also be merged into an existing Node to define or undefine fields on it.


Field
^^^^^

A key feature of the Zinc library is its consistent use of *Field* objects to describe quantities which vary over domains, including in space and time. Zinc Fields include interpolated 'finite element' fields, images and around 100 other types of fields including those defined by mathematical operators (arithmetic, trigonometric, logical, conditional, vector, matrix, derivatives, summation, integration, constants), algorithms (ITK image processing filters, find mesh location) and other specialised types.

Methods on the Fieldmodule API are used to create fields of particular types corresponding to the operator or method each is defined with. For simple mathematical operators the arguments in their create method are enough to fully define the field. For example an 'add' field requires 2 source fields; in C++ you can write ``Field c = fieldmodule.createFieldAdd(a, b);`` or use operator overloading to write just ``Field c = a + b;`` assuming fields ``a`` and ``b`` are already defined. With the exception of 'alias' and 'group' field types, fields may only be defined in terms of domains and fields from the same Region.

Field API includes methods to get and set name, coordinate system, is-managed state and other attributes. It offers methods to evaluate and assign field values (of real, string and mesh location type) which require a *Fieldcache* object, obtained from the owning Fieldmodule. The Fieldcache has methods to set the domain location including time at which to evaluate or assign fields, and it also stores intermediate values and per-field caches which make multiple evaluations more efficient.

More complex field types offer type-specific APIs or require other objects to complete their definition. Note that the C++ and Python APIs correctly present the polymorphism of field types, meaning all the methods of the base Field type can be called for a derived field object. The C API requires the use of ``base_cast`` functions to get a base Field handle to pass to base field functions. Cast methods on the base Field are used to obtain handles to derived types, which are valid if the field is of that type.

Following are some details on more complex field types.

Finite Element Field	
""""""""""""""""""""

Zinc finite element fields (*FieldFiniteElement*) allow stored values or parameters at nodes and elements, and interpolation over elements using a variety of basis functions including tensor products of functions over each element coordinate direction. Different interpolation can be used for each field component. Finite element fields are often defined from file input, but can also be created and modified programmatically.

When a finite element field is first constructed it is not defined anywhere: only the number of components is declared. As described earlier, Node, Nodetemplate and Nodeset API methods are used to define the field value/parameter storage at nodes which can then be set/assigned, while Element, Elementtemplate and Mesh API methods are used to define interpolation of finite element fields over new and existing elements. The API supports mapping of nodal derivatives and versions, however at the time of writing APIs for setting up scaling of element parameters are not available, limiting full definition of Hermite interpolation to reading data in EX format; this is being actively worked on.

Image Field and Imagefilters
""""""""""""""""""""""""""""

A Zinc image field (*FieldImage*) stores a 2-D or 3-D image giving field values at texture coordinates given on its domain field. 8 and 16 bit images are supported with 1 to 4 components.

The Image Field has type-specific API for reading image files individually, or using a *Streaminformation* object a stack of 2-D images can be read to create a 3-D image. Zinc supports reading and writing most well-known image file formats including jpg, png, bmp, dicom, raw uncompressed data and others. Image fields can be attached to Materials for graphics texturing, bump mapping and as general sources of data in material shader programs.

Zinc image filter field types (*FieldImagefilter~*) implement a selection of `ITK <http://www.itk.org>`_ filters to perform image processing on input image fields. Note that image filters describe operations but don't make a stored image as a result. Instead one must use a special variant image field that is set to be automatically generated from the source field.

Group Fields
""""""""""""

Zinc group fields are a collection of field types used to represent subsets of domains in a Region or Region tree. As fields they evaluate to 1 (true) at domain locations in the group, and 0 (false) outside, allowing them to be combined in logical operations with other field expressions. However, the subdomains can also be interrogated by other high level functions.

The basic group field (*FieldGroup*) has a flag indicating whether the owning Region is in the group, which excludes its sub-regions. It also maintains a list of related group fields from child Regions, and subobject group fields for describing parts of domains from the same region. Node group and element group fields (*FieldNodeGroup* and *FieldElementGroup*) keep track of a subset of a Nodeset or Mesh domains, respectively, and offer the ability to get a handle to the corresponding NodesetGroup or MeshGroup subdomain, for modifying or iterating over.

Each Scene has an optional *selection group* attribute which can take a Group field, and supplies the currently selected domain objects for highlighting in graphics.

Timekeeper and Timenotifier
^^^^^^^^^^^^^^^^^^^^^^^^^^^

The Zinc library maintains a *Timekeeper* object, obtained from its module (in turn obtained from the Context or any Scene) for synchronising time across the model and graphics, and *Timenotifier* objects for requesting notification at specified times or frequencies.

While physical timing is left to client UI code, the Timekeeper can be queried for the next optimal time to redraw. The client is responsible for setting the current time in the Timekeeper to make it available to Zinc objects. This ensures graphics for time-varying models are generated at that time, and other objects report the correct time, notably time value fields (*FieldTimeValue*) which return the current time from a Timekeeper allowing it to be incorporated into field expressions.


Graphics and Interaction
------------------------

This section describes the main object types used to build visualisations of Zinc models, and also perform rendering and picking. The key Scene and Graphics types are described first, followed by supporting types in alphabetical order.

Scene
^^^^^

Each Zinc Region has an associated *Scene* object which contains the graphical representation of the Region's domains and fields, turning the Region tree into a 'scene graph'. The Scene consists of a list of Graphics in the order they are to be drawn by a *Sceneviewer*. The Scene API has methods for creating Graphics of each type, and for iterating over and modifying the list. Scene begin/end change methods should be called for multiple changes to the Scene or any of its Graphics.

The Scene maintains a visibility flag which graphics can be filtered by, and its selection group field can be set to automatically highlight graphics for selected parts of the model in the Scene and child Scenes. For convenience the modules containing graphics-related objects (Material, Spectrum, Glyph etc.) can be obtained from any Scene.

Graphics
^^^^^^^^

Each Zinc Graphics object generates a set of graphics primitives (points, lines, surfaces for display in 3-D space) from domains and fields of its Scene's owning Region. There are 5 types of Graphics as described below, which differ in algorithm and by the dimension of domain they work with.

Each Graphics type has a number of attributes controlling it. Attributes valid for all types include:

  * Coordinate field: supplies the coordinates of the graphics. Does not need to be geometric; e.g. temperature-pressure, strain space.
  * Scene coordinate system: specifies whether graphics are drawn in local, world or a Sceneviewer/window-relative coordinate system for overlay effects.
  * Tessellation: controls approximation of curves by line segments.
  * FieldDomainType: the domain to visualise, as appropriate to algorithm: a Mesh (``MESH1D``, ``MESH2D``, ``MESH3D`` and the automatic ``MESH_HIGHEST_DIMENSION``), Nodeset (``NODES``, ``DATAPOINTS``) or a single point per region (``POINT``).
  * Subgroup field: specifies subset of domain to visualise.
  * Material, selected material: specify colouring/shading of unselected and selected objects.
  * Texture coordinates field: map to coordinates range of Material texture.
  * Data field, Spectrum: for colouring graphics by a field.
  * Name, visibility flag: metadata for finding graphics or filtering with a Scenefilter.

All Field attributes are cleared for new Graphics, so essential fields such as the coordinate field must be set in order to generate graphics. Other attributes including materials, tessellation, fixed values and flags have standard defaults.

Some attributes are bundled into separate objects and apply to only some Graphics types:
  * *Graphicspointattributes*: how points are visualised including the glyph, orientation scale fields and values, label field and font.
  * *Graphicslineattributes*: how lines are visualised including shape, scaling fields and values.
  * *Graphicssamplingattributes*: how discrete points are sampled in elements.

Graphics primitives are generated on-demand when rendering and are automatically marked for update when domains, fields and Graphics attributes are changed.

Points
""""""

*Points* Graphics visualise discrete locations in the model with oriented and scaled glyphs and text labels as specified by the Graphicspointattributes. Points can be generated on any field DomainType. For mesh domains, points are sampled in elements according to the Graphicssamplingattributes and Tessellation. The single point domain is used to draw a single glyph such as axes or colour bar (and is the only case not requiring a coordinate field as it defaults to the origin).

Lines
"""""

*Lines* visualise 1-D elements in the model, which currently requires 1-D line (and 2-D face) elements to be read in, or defined via the Fieldmodule, for higher dimensional elements. Lines are visualised according to the Graphicslineattributes, and can be displayed as lines or extruded circles.

Surfaces
""""""""

*Surfaces* visualise 2-D elements in the model. To view faces of 3-D elements, Zinc currently requires 2-D face elements to be read in or defined via the Fieldmodule.

Contours
""""""""

*Contours* generate surfaces (for 3-D domains) or lines (for 2-D domains) where its isoscalar field equals particular values. Isovalues can be specified as a list, or a number and range. These attributes are settable from the Contours derived-type API.

Streamlines
"""""""""""

*Streamlines* visualise the path of a fluid particle tracking along a stream vector field specified via the Streamlines derived-type API. 2-D and 3-D mesh domains are supported. Seed points for streamlines are sampled from elements according to the Graphicssamplingattributes and Tessellation. Streamlines are drawn as lines, scalable ribbons or extruded circles or squares, as specified by the Graphicslineattributes. The curl of the stream vector field, or fibre sheet and normal, are visualised by the rotation or lateral orientation of the streamline when viewed with non-line shapes.

Font
^^^^

Each Zinc *Font* is a particular OpenType typeface with a size and RenderType (bitmap, polygon, outline etc.), and is used to control the appearance of labels on Points Graphics. Fonts are managed by the *Fontmodule* which has methods to find and create fonts, and set the default font for new Graphics.

Glyph
^^^^^

A *Glyph* is a simple graphics objects that can be drawn at each point in a Points Graphics, with scaling and orientation varying per point. Glyphs are managed by the *Glyphmodule* which has methods to find them by name or by their Glyph ShapeType. It also has a method to define standard glyphs: point, sphere, cylinder, cone, cube, arrows and 3-D axes, which currently must be called on start-up to use glyphs (but note this should be called *after* defining standard materials needed for coloured glyphs).

The Glyphmodule also permits creation of two specialised glyph types: *Axes* (set of 3 orthogonal axes with labels) and *ColourBar* (a scale showing the range and colours of a Spectrum, with labels). The ColourBar automatically updates to show the current state of its Spectrum. A recent feature permits a Glyph to be created by copying the primitives from a Graphics object, permitting user-defined glyphs.

Some Glyphs inherit properties from the Points Graphics they are used in. Axes and colour bar use the font, and circular glyphs (cylinder, cone, sphere, arrow solid) are drawn with the Circle Divisions from the Tessellation.

Light
^^^^^

A *Light* combines with the properties of the Zinc *Material* to colour and shade graphics. Lights may be one of four types: ``AMBIENT``, ``DIRECTIONAL``, ``POINT``, ``SPOT``. These types and their attributes (colour, direction, position, attenuation, etc.) are consistent with the standard OpenGL lighting/shading model.

Lights are managed by their *Lightmodule*. It has a default [directional] light which acts as a 'head light' pointing into the view and slightly down when used in a Sceneviewer. The default ambient light gives a small amount of lighting from all directions so graphics aren't completely black when not lit. Additional lights may be created and added to Sceneviewers.

Material
^^^^^^^^

A Zinc *Material* specifies colouring of Graphics similarly to the original OpenGL lighting/shading model with diffuse, ambient, emission and specular colours, shininess and alpha/opacity. Image fields can be attached for texturing (and will be used by OpenGL shaders once enabled in a future release).

Materials are managed by the *Materialmodule*, which is obtainable from the Context or a Scene. It provides methods to create materials, define the standard materials (recommended when starting up Zinc), and supplies default materials for new Graphics.

Scenefilter
^^^^^^^^^^^

Zinc *Scenefilter* objects are Boolean functions determining which Graphics are drawn in a Sceneviewer, or processed by a Scenepicker or other tool. Scenefilters are managed by the *Scenefiltermodule* which has methods for creating several types of filters. The initial default Scenefilter is for 'visibility flags' which returns true i.e. shows Graphics whose visibility flag is set AND whose Scene and all parent Scenes have their visibility flags set. Other types filter by Region/Scene, Graphics name, Graphics Type, FieldDomainType, and logical and/or operators allow expressions combining multiple filters.

Scenepicker
^^^^^^^^^^^

A *Scenepicker* is used to pick Graphics and domain objects in a Scene. The picking volume can be set to a rectangle in a Sceneviewer in any window-relative coordinate system, including pixel coordinates matching those in UI mouse events. The nearest Graphics, Node or Element can be queried for, and convenience methods allow all nodes or elements in the volume to be added to a group field. The Scenepicker has a Scenefilter attribute, often set to an expression combining the Sceneviewer's filter with other filters to make picking more precise and efficient. A Scenepicker is created by a method on the Scene.

Sceneviewer
^^^^^^^^^^^

The Zinc Sceneviewer is responsible for rendering the graphical Scene using OpenGL. It has methods to set its top Scene and Scenefilter (allowing different sets of graphics to be viewed in different windows), and to get and set attributes controlling the view orientation, field of view, clipping planes and more. Its ``renderScene()`` method tells the Sceneviewer to render the Scene with OpenGL. The Sceneviewer is created from the *Sceneviewermodule*, obtained from the Context or any Scene.

Since the OpenCMISS-Zinc Library is UI-independent, client code has these additional responsibilities:

  * Create the OpenGL-capable canvas/window in their UI library, with a Sceneviewer.
  * Set the Sceneviewer viewport size to match the canvas, including on resize events.
  * Make the OpenGL Context current for the canvas and tell the Sceneviewer to render.

The Sceneviewer offers a *Sceneviewernotifier* object which notifies of any changes to the graphics or view requiring a redraw, with flags indicating whether transformation or content has changed. Also, to get Zinc to handle rotating, panning and zooming of the window, mouse events can be converted into *Sceneviewerinput* objects and passed to the Sceneviewer to process. Examples and reusable code for performing these UI-specific tasks are found elsewhere in OpenCMISS documentation.

New Sceneviewers get the default directional and ambient lights from the *Lightmodule*, but these can be changed and additional lights added.

Spectrum
^^^^^^^^

A Zinc *Spectrum* maps values of a Graphics data field to colours. It consists of a list of *Spectrumcomponent* objects each of which maps a single component of the data field to one of several colour ramps, rainbow, alpha ramp, contour bands or a step function. Multiple components add to give the overall colouring. Spectrums are managed by the *Spectrummodule*, obtained from the Context or any Scene.

The Scene ``getSpectrumDataRange()`` method gets the ranges of data field components in use by Graphics using a particular Spectrum.

Tessellation
^^^^^^^^^^^^

Zinc *Tessellation* objects control the number of polygons or line segments used to draw element surfaces and lines, and circular forms in Graphics. Its attributes include the Minimum Divisions to use on each element coordinate direction and the Refinement Factors which multiply the minimums for a coordinate field with non-linear bases or a curvilinear coordinate system. The Circle Divisions attribute gives the number of segments used to draw circular glyphs and circle extrusions. Changing a Tessellation causes all graphics using it to be updated, giving global control of quality.
The *Tessellationmodule* manages the list of Tessellations and has methods for creating new Tessellations, and getting and setting default Tessellations for new Graphics. It has a separate default for Points Graphics with a single division in each element coordinate.

Miscellaneous
-------------

Optimisation
^^^^^^^^^^^^

Zinc offers flexible non-linear optimisation built on its arbitrary field expression capabilities. An *Optimisation object* is created from a Fieldmodule, and its API has methods to set up the optimisation problem including dependent fields, objective fields, solution method, tolerances and maximum iterations. Supported solution methods are Quasi-Newton and Least Squares Quasi-Newton. Once the problem is set up, the ``optimise()`` method is called to run the optimisation until its stopping criteria are met, and it can be called again if needed.

The optimisation problem requires specifying one or more dependent fields whose parameters will be changed to minimise the objective function. These can be Constant or Finite Element type. One or more Objective fields must be specified to give terms of the objective function that is to be minimised. Objective fields are typically sums or integrals over the domain of interest, hence not spatially varying. For example, the Objective function for mesh fitting problems could be the sum (over all data points) of squared error between point coordinates and their projected coordinates on the mesh, which can be described by a *NodesetSumSquares* field type. Additional Objective fields allow constraints and penalty functions to be easily added.
