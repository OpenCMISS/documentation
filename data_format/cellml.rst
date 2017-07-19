.. image:: CellML_Logo_200x100.png
   :align: right
   :target: https://www.cellml.org/

CellML in OpenCMISS
===================

OpenCMISS supports reading and solving models described in the `CellML language <https://www.cellml.org/>`_, an open standard for representing mathematical models, based on the XML Markup Language.

A CellML model defines scalar *variables* and mathematical expressions on them (using a subset of `MathML 2.0 Content Markup <https://www.w3.org/TR/MathML2/>`_) within *components*, effectively sub-models with their own namespace for variables. *Imports* allow parts of other CellML models to be instantiated, permitting modular model construction and reuse, and *connections* tie together variables from different parts. Units are strictly enforced on variables, connections and maths in CellML. There are also extensive specifications for linking metadata to CellML model constructs. For in-depth documentation and specifications refer to `cellml.org <https://www.cellml.org/>`_.

CellML is most commonly used to describe lumped parameter (0-D or spatially constant) models which are solved over time. The open `CellML Model Repository <http://models.cellml.org/cellml>`_ catalogs a large number of curated CellML representations of the important models of biological processes or whole cell function from the literature. The repository also contains other CellML models with more general uses including constitutive laws describing material behaviour such as mechanical stress-strain relationships.

OpenCMISS-Iron allows lumped parameter CellML models to be solved on large numbers of points over spatial domains, and provides facilities for tying CellML variables to spatially varying fields so local cell and global physics equations are simultaneously solved. It also supports reading general constitutive laws such as mechanical stress-strain functions in CellML format and solving mechanics and other problems with them. Both cases use the code generation facilites of the CellML API Library, with on-the-fly compilation and linking to ensure high performance computation.
