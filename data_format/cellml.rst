.. image:: CellML_Logo_200x100.png
   :align: right
   :target: https://www.cellml.org/

CellML in OpenCMISS
===================

OpenCMISS supports reading and solving models in CellML format, an open standard for representing mathematical models, based on the XML Markup Language.

Detailed documentation and specifications for CellML are given on `cellml.org <https://www.cellml.org/>`_, but its core features are the definition of scalar *variables* and the mathematical equations relating them. CellML is most commonly used to describe lumped parameter (0-D or spatially constant) models which are solved over time, but there are many other applications such as describing material constitutive laws. The open `Physiome Model Repository <https://models.physiomeproject.org/>`_ catalogs a large number of curated CellML models of various types, including representations of a great many important models of biological processes or whole cell function from the literature.

OpenCMISS-Iron allows lumped parameter CellML models to be solved on large numbers of points over spatial domains, and provides facilities for tying CellML variables to spatially varying fields so local cell and global physics equations are simultaneously solved. It also supports reading general constitutive laws such as mechanical stress-strain functions in CellML format and solving mechanics and other problems with them. Both cases use the code generation facilites of the CellML API Library, with on-the-fly compilation and linking to ensure high performance computation.
