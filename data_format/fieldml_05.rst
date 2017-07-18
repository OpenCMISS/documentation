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

FieldML is designed to have a minimal set of constructs from which models can be build. Its avoids complex high-level objects such as *elements* which may be familiar in modelling codes, instead declaring sets of labels for such objects, and interchanging all of their attributes as maps from labels to values, in the same way that fields are mapped to model domains. This not only makes for a simpler data model and library but typically makes the serialisation much smaller because:

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

FieldML 0.5 represents every discrete set via an ``EnsembleType`` consisting of a set of integer labels, defined either as a simple range or via a separate bulk ``DataSource`` (see below). These are used for labelling mesh elements, nodes, data points, parameter indexes, field components, derivative types, versions etc.

A ``ContinuousType`` declares an *N*-dimensional continuous space with a connected topology. If *N>1*, it also declares an ``EnsembleType`` to index its components. These are used to represent coordinate systems including element charts and the codomains of real-valued fields.

A ``MeshType`` defines a sets of elements via an ``EnsembleType`` plus a mapping to each element's shape as a subset of the ``ContinuousType`` element chart for the mesh dimension. Non-trivial shape mappings are defined using a ``ParameterEvaluator`` (see below) using a separate ``DataSource`` for the shape map data.

Evaluators
^^^^^^^^^^

FieldML 0.5 'Evaluators' are used to define functions of values from zero or more Types, giving a single value of its specified value type. These serve to represent not only fields but all other mappings, parameter sets and constants used in the representation of finite element and other computational models. The Evaluator types in FieldML 0.5 are described in the following.

An ``ArgumentEvaluator`` serves as a value of a Type (or location in a domain), as a starting point for evaluation, but also to represent unknown inputs to field templates. It is defined by its output value type, and optionally by any other arguments it is expected to vary with. A complex example of the latter case is unknown node parameters defined as a real value that is a function of an argument of ``EnsembleType`` nodes.

A ``ParameterEvaluator`` maps one or more ``EnsembleType`` arguments to real values (for typical field parameters) or ``EnsembleType`` labels (for other maps). The parameter map may be dense, giving a value for all permutations of discrete arguments, or sparse, which is represented using a *Dictionary of Keys*. In both cases the bulk data is referenced from separate ``DataSource`` arrays (see below). Examples:

* Nodal coordinates: nodes, coordinate components → real
* Local-to-global node map: elements, local points → nodes

A ``ConstantEvaluator`` is a convenient simplification of ``ParameterEvaluator`` giving a constant value.

A ``ReferenceEvaluator`` applies another evaluator and optionally binds one or more arguments it depends on to perform function composition. A common use is to apply an interpolation function from the FieldML standard library at the chart location for a given mesh and with parameters mapped to elements for a given mesh and field (or if defining a template: an argument representing unknown field parameters).

A ``PiecewiseEvaluator`` switches between delegate evaluators depending on the value of an index argument of ``EnsembleType``, or indirectly via an evaluator giving such a value. A common use is to switch between different functions on elements of a mesh, e.g. different basis functions or parameter maps. The indirect form commonly uses a ``ParameterEvaluator`` with a separate ``DataSource``.

An ``AggregateEvaluator`` similarly builds a vector ``ContinuousType`` value by switching delegate function by component. Common uses include switching between field templates used for each field component, and aggregating element parameters for passing to interpolation functions.

An ``ExternalEvaluator`` is an extension mechanism mainly used in the FieldML Standard Library to describe a function external to the language. The URL and name of interpolation functions etc. in the Standard Library are intended to be permanent identifiers for the functions and are documented as such.

Data Resources and Data Sources
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Bulk data for ``ParameterEvaluator`` objects, ``MeshType`` element shape maps and ``EnsembleType`` identifier declarations is supplied by ``DataSource`` objects describing arrays within a ``DataResource``, which consists of either inline text, or a link to an external text file or HDF5 document. For large models, external data resources are required to gain the promised performance of FieldML; inline text is however fine for explaining concepts and for small datasets.

Imports and the FieldML Standard Library
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

FieldML 0.5 Imports make FieldML Types and Evaluators from another document available under local aliases. Most commonly these are imported from the FieldML Standard Library, which defines many ``ExternalEvaluator`` objects representing interpolation by common basis functions, with supporting element parameter vector types. It also defines standard element shape bounds evaluators and declarations of types representing Cartesian coordinate systems.

FieldML Patterns for OpenCMISS
------------------------------

Synonym issues.
Status in Zinc and Iron.
Limitations.

Simple cube model
-----------------


Simple model with varying element shape and interpolation
---------------------------------------------------------


Hermite interpolation with derivatives and versions
---------------------------------------------------


Scaling and general linear map
------------------------------
