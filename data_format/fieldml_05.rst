FieldML 0.5 use in OpenCMISS
============================

Overview
--------

FieldML 0.5 is a data format for representing spatio-temporal computation models, for example finite element meshes and fields. It is designed for efficient random access to model data, making it suited to use for distributed parallel computation where it is necessary to read part of a model into each parallel *rank* or *computation node*. 

This document gives a brief introduction to FieldML 0.5 and explains how it is used within OpenCMISS, illustrating this with some simple examples.

Note that FieldML is in active development and new features and changes are planned to better support current and future model representations, both in OpenCMISS and other software.

Introduction to FieldML 0.5
---------------------------

The following gives a quick introduction to the objects making up the FieldML 0.5 data model, suitable for explaining how it is used in OpenCMISS. More detailed information can be found in `this paper <https://link.springer.com/article/10.1007/s11517-013-1097-7>`_.

FieldML is designed to have a minimal set of constructs from which models can be build. It avoids complex high-level objects such as *elements* which may be familiar in modelling codes, instead declaring sets of labels for such objects, and interchanging all of their attributes as maps from labels to values, in the same way that fields are mapped to model domains. This not only makes for a simpler data model and library but typically makes the serialisation much smaller because:

1. Optional attributes are only output if used.

2. Compression schemes can be used to minimise map size, especially where an attribute is the same for all members of a set.

3. It aids separating simple bulk data from the semantic-rich description.

FieldML's design enables models to be described by a compact, semantic-rich part which declares the high level objects plus the format and location of separate bulk data. Modelling software can read the semantic rich part and then determine which of the constructs to instantiate into their domains, fields and other data structures, and then extract the appropriate part of the bulk data into mappings and parameter sets, including part of the data for partitioned problems.

FieldML 0.5 is currently serialised in XML. The serialisation is not described in detail here but some examples are presented later. It is expected that most users will either use OpenCMISS Zinc or Iron APIs to create models and output them in FieldML, or directly use the `FieldML API <https://github.com/FieldML/FieldML-API>`_.

Region
^^^^^^

A FieldML 0.5 document consists of a single ``Region`` in which may be defined any of the following objects which are uniquely named within its namespace. Multiple regions are not supported in this version.

Types
^^^^^

Finite element and other computation models are built out of *domains*: sets which label the spaces making up the model and give them their topology. Additionally, more abstract sets are needed to represent parameter indexes, components and other discrete quantities. FieldML 0.5 represents these as 'Types', which are further divided into discrete, continuous and mixed. Types describe both the spaces over which fields are defined (their *domain*), and the type of value they compute (their *codomain*); see the Evaluators section for more details.

FieldML 0.5 represents every discrete set via an ``EnsembleType`` consisting of a set of integer labels, defined either as a simple range or via a separate ``DataSource`` (see below). These are used for labelling mesh elements, nodes, data points, parameter indexes, field components, derivative types, versions etc.

A ``ContinuousType`` declares an *N*-dimensional continuous space with a connected topology. If *N>1*, it also declares an ``EnsembleType`` to index its components. These are used to represent coordinate systems including element charts and the codomains of real-valued fields.

A ``MeshType`` is a hybrid of these, defining a set of elements via an ``EnsembleType`` plus a mapping to each element's shape as a subset of the ``ContinuousType`` element chart for the mesh dimension. Non-trivial shape mappings are defined using a ``ParameterEvaluator`` (see below) using a separate ``DataSource`` for the shape map data.

Evaluators
^^^^^^^^^^

FieldML 0.5 'Evaluators' are used to define functions giving a value of a specified Type, in terms of values of zero or more arguments of further Types. These serve to represent not only fields but all other mappings, parameter sets and constants used in finite element and other computational models. The Evaluator types in FieldML 0.5 are described in the following.

An ``ArgumentEvaluator`` gives a value of a Type, serving as a starting point for evaluation e.g. to give a location in a domain. It may optionally have arguments of its own so it can represent unknown functions which may be used as template arguments. For example, a field template may be defined in terms of an unknown node parameters argument, promising a real value as a function of an argument of ``EnsembleType`` nodes. When defining a field from this template, this argument must be bound to actual field parameters.

A ``ParameterEvaluator`` maps one or more ``EnsembleType`` arguments to real values (for typical field parameters) or ``EnsembleType`` labels (for other maps). The parameter map may be dense, giving a value for all permutations of discrete arguments, or sparse, which is represented using a *Dictionary of Keys*. In both cases the bulk data is referenced from separate ``DataSource`` arrays (see below). Examples:

* Nodal coordinates: nodes, coordinate components → real
* Local-to-global node map: elements, local points → nodes

A ``ConstantEvaluator`` is a convenient simplification of ``ParameterEvaluator`` giving a constant value.

A ``ReferenceEvaluator`` applies another evaluator and optionally binds one or more arguments it depends on to perform function composition. A common use is to apply an interpolation function from the FieldML standard library at the chart location for a given mesh and with parameters mapped to elements for a given mesh and field (or if defining a template, values derived from unknown field parameters).

A ``PiecewiseEvaluator`` switches between delegate evaluators depending on the value of an index argument of ``EnsembleType``, or indirectly via an evaluator giving such a value. A common use is to switch between different functions on elements of a mesh, e.g. different basis functions and/or parameter maps. The indirect form commonly uses a ``ParameterEvaluator`` with a separate ``DataSource``.

An ``AggregateEvaluator`` similarly builds a vector ``ContinuousType`` value by switching the delegate evaluator by component. Common uses include switching between field templates used for each field component, and aggregating element parameters for passing to interpolation functions.

An ``ExternalEvaluator`` is an extension mechanism mainly used in the FieldML Standard Library to describe a function external to the language. The URL and name of interpolation functions etc. in the Standard Library are intended to be permanent identifiers for the functions and are documented as such.

Data Resources and Data Sources
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Bulk data for ``ParameterEvaluator`` objects, ``MeshType`` element shape maps and ``EnsembleType`` identifier declarations is supplied by ``DataSource`` objects describing arrays within a ``DataResource``, which consists of either inline text string, or a link to an external text file or HDF5 document. For large models, external data resources are required to gain the promised performance of FieldML; inline string data is however fine for explaining concepts and for small datasets.

Note that the format for extracting arrays from text resources permits starting at any line in the resource and picking particular ranges of columns from it. This often allows parts of other data formats to be marked up for reading via FieldML.

Imports and the FieldML Standard Library
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

FieldML 0.5 Imports make FieldML Types and Evaluators from another document available under local names.

Most commonly these are imported from the FieldML Standard Library, which defines many ``ExternalEvaluator`` objects representing interpolation by common basis functions, with supporting element parameter vector types. It also defines standard element shape bounds evaluators and declarations of types representing Cartesian coordinate systems.

FieldML Conventions for OpenCMISS
---------------------------------

FieldML is free from many limitations of modelling software data structures, including those of the OpenCMISS libraries, Iron and Zinc. For example, it can define an unlimited number of meshes and point sets (nodes, data points etc.) in a Region, and their relationship with each other is not fixed. In contrast, OpenCMISS libraries have one set of nodes per region (plus a similar set of data points) with a fixed relationship to all meshes. Iron supports any number of mesh objects in a region, but Zinc is currently limited to one mesh each of dimensions 1, 2 and 3 (but this and the limitation on the number of point sets will be removed in future, to allow any number of uniquely-named domains).

FieldML is also a powerful enough language to be able to represent the many different data structures that modelling software packages use. Major differences stem from their degree of templating and reuse, for example whether they employ mesh field/component templates, element field/component templates, or use no templates at all. A vector field may be implemented to switch function by element before component or element after component. FieldML thus has a 'synonym problem' in that it is capable of describing different data models through different sequences of evaluators, and while these can usually be translated to the representation of another software package, doing so takes time and is only done when needed.

For these practical reasons it is necessary to adopt conventions for encoding models in FieldML, and the following lists those conventions currently used within OpenCMISS:

1. Nodes are always serialised as an ``EnsembleType`` called ``"nodes"``. Similar naming conventions are being adopted for nodal derivatives and versions, and for the set of data points.
2. 'Mesh field templates' are defined which describe interpolation of a scalar real value over a mesh in terms of unknown node parameters and potentially element and other parameters. This is consistent with the mesh component/domain objects in Iron, and the mesh field template objects being added to Zinc. Mesh field templates use a ``PiecewiseEvaluator`` to switch which 'element field template' is used at each element, even if it does not vary by element.
3. 'Element field templates' are defined as a ``ReferenceEvaluator`` which applies a basis interpolator but binds parameters from the node parameters argument using a local-to-global node map, and binds the generic chart for the interpolator to the element chart for this mesh. OpenCMISS FieldML readers currently recognise a legacy convention suitable only for simple Lagrange and simplex basis functions, which aggregates their parameters by applying the node parameters and binding the local-to-global node map. This is being replaced by a more general two-part element field template: the first 'generic' part describes the interpolation and parameter mapping that is common to all elements e.g. in terms of local nodes (and their parameters), local scale factors, and the generic element chart. The second part applies this but binds in the local-to-global node map, local-to-global scale factor map, and the mesh element chart.
4. Scalar fields are implemented as a ``ReferenceEvaluator`` applying a mesh field template and binding actual node parameters to the unknown node parameters template argument.
5. Vector fields are implemented as an ``AggregateEvaluator`` delegating to the appropriate mesh field templates for each field component, and binding actual node parameters to the unknown node parameters template argument. The actual node field parameters must also vary by field component.

OpenCMISS FieldML I/O API and Limitations
-----------------------------------------

The limitation on having only one Region in FieldML 0.5 applies.

OpenCMISS-Zinc reads and writes to FieldML using its standard region serialisation APIs. A current limitation is that it only reads or writes a single mesh (that of the highest dimension in use) and the fields defined on it. Zinc is reliant on the naming conventions for nodes, node derivatives and versions mentioned in point 1 above. However, if the above conventions are adhered to, Zinc will read the mesh and all fields defined on it without any additional API calls or options. Support for Hermite bases with node derivatives and versions is implemented in Zinc, however implementation of scale factor serialisation and general linear maps is currently in progress.

OpenCMISS-Iron is currently limited to reading and writing basic FieldML models consisting of Lagrange and simplex bases that are homogeneous across elements. The Iron API for reading from FieldML currently requires more client intervention to specify the global Iron objects into which meshes, mesh field templates, basis functions and fields (as evaluators) are read, plus the nodes ensemble is explicitly named in the FieldML dataset. Through this API Iron is capable of reading several meshes from a single FieldML dataset.

Only node-mapped parameters are currently handled in FieldML by OpenCMISS Iron and Zinc.

Example Models
--------------

Note that all the following models are output by an in-development version of OpenCMISS-Zinc. In most cases inline string data resources are used to keep everything in one file. The first example explains most parts of the FieldML 0.5 document in depth; later examples focus on new concepts.


.. toctree::
   :maxdepth: 1

   fieldml/cube_pressure
   fieldml/tetmesh
   fieldml/wheel
.. fieldml/hermite_network Hermite 1-D network with derivatives and versions

Serialisation of scale factors and general linear maps is currently being worked on, and an example will be added when that is production ready.
