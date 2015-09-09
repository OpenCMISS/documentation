# Example animate_jaw.  Animates opening and closing of the jaw using the Emoter
#
#

#  Put the mandible scene in another scene "mandible" so that it can be transformed later
gfx modify scene default manual_g_element;
gfx create scene mandible manual_g_element;
gfx draw child_scene mandible scene default;

#  Read the bones used for animation
gfx read nodes $example/mandible_teeth.exnode
gfx read elements $example/mandible_teeth.exelem

gfx read nodes $example/mandible_teeth_linear.exnode

gfx read nodes $example/maxilla_teeth.exnode
gfx read elements $example/maxilla_teeth.exelem

gfx read nodes $example/cranium.exnode
gfx read elements $example/cranium.exelem

#  Read the TMJ disk and the muscles to be viewed later if wanted
gfx read nodes $example/TMJ_disk_bothsides.exnode
gfx read elements $example/TMJ_disk_bothsides.exelem

gfx read nodes $example/temp_nodes_right.exnode
gfx read elements $example/temp_nodes_right.exelem
gfx read nodes $example/temp_nodes_left.exnode
gfx read elements $example/temp_nodes_left.exelem
gfx read nodes $example/mass_nodes_right.exnode
gfx read elements $example/mass_nodes_right.exelem
gfx read nodes $example/mass_nodes_left.exnode
gfx read elements $example/mass_nodes_left.exelem
gfx read nodes $example/mpt_nodes_right.exnode
gfx read elements $example/mpt_nodes_right.exelem
gfx read nodes $example/mpt_nodes_left.exnode
gfx read elements $example/mpt_nodes_left.exelem
gfx read nodes $example/lpt_nodes_right.exnode
gfx read elements $example/lpt_nodes_right.exelem
gfx read nodes $example/lpt_nodes_left.exnode
gfx read elements $example/lpt_nodes_left.exelem

# Add groups to the mandible scene and default scene
gfx draw group mandible_teeth scene mandible;
gfx draw group mandible_teeth_linear scene mandible;
gfx draw group TMJ_disk scene mandible;
gfx draw group maxilla_teeth scene default;
gfx draw group cranium scene default;
gfx draw group temp_nodes_right scene default;
gfx draw group temp_nodes_left scene default;
gfx draw group mass_nodes_right scene default;
gfx draw group mass_nodes_left scene default;
gfx draw group mpt_nodes_right scene default;
gfx draw group mpt_nodes_left scene default;
gfx draw group lpt_nodes_right scene default;
gfx draw group lpt_nodes_left scene default;

gfx modify g_element mandible_teeth general clear circle_discretization 6 default_coordinate coordinates element_discretization "4*4*4" native_discretization none scene mandible;
gfx modify g_element TMJ_disk general clear circle_discretization 6 default_coordinate coordinates element_discretization "4*4*4" native_discretization none scene mandible;


# Create some materials
gfx create material bone ambient 1 1 0.61 diffuse 1 1 0.61 emission 0 0 0 specular 1 1 0.7 alpha 1 shininess 1
gfx create material muscle ambient 1 0.13 0.16 diffuse 1 0.32 0.21 emission 0 0 0 specular 0.9 0.28 0.23 alpha 1 shininess 1

if(!$ZINC) # If not using the Physiome Extension, ZINC.
{
  # create window
  gfx create window 1 double_buffer;
  gfx modify window 1 image scene default light_model default;
  gfx modify window 1 image add_light default;
  gfx modify window 1 layout simple ortho_axes z -y eye_spacing 0.25 width 906 height 736;
  gfx modify window 1 set current_pane 1;
  gfx modify window 1 background colour 0 0 0 texture none;
  gfx modify window 1 view parallel eye_point 118.601 177.568 -41.3839 interest_point -10.2114 -3.125 -41.2435 up_vector -0.00605026 0.00509002 0.999969 view_angle 78.3522 near_clipping_plane 2.21907 far_clipping_plane 793.019 relative_viewport ndc_placement -1 1 2 2 viewport_coordinates 0 0 1 1;
  gfx modify window 1 set transform_tool current_pane 1 std_view_angle 40 perturb_lines no_antialias slow_transparency blend_normal;
}
# Load surface materials
gfx modify g_element mandible_teeth surfaces select_on material bone selected_material default_selected render_shaded scene mandible;
gfx modify g_element TMJ_disk surfaces select_on material bone selected_material default_selected render_shaded scene mandible;

gfx modify g_element maxilla_teeth surfaces select_on material bone selected_material default_selected render_shaded scene default;
gfx modify g_element cranium surfaces select_on material bone selected_material default_selected render_shaded scene default;
#gfx modify g_element shanes_skull surfaces select_on material bone selected_material default_selected render_shaded scene default;

gfx modify g_element temp_nodes_right surfaces select_on material muscle selected_material default_selected render_shaded scene default;
gfx modify g_element temp_nodes_left surfaces select_on material muscle selected_material default_selected render_shaded scene default;
gfx modify g_element mass_nodes_right surfaces select_on material muscle selected_material default_selected render_shaded scene default;
gfx modify g_element mass_nodes_left surfaces select_on material muscle selected_material default_selected render_shaded scene default;
gfx modify g_element mpt_nodes_right surfaces select_on material muscle selected_material default_selected render_shaded scene default;
gfx modify g_element mpt_nodes_left surfaces select_on material muscle selected_material default_selected render_shaded scene default;
gfx modify g_element lpt_nodes_right surfaces select_on material muscle selected_material default_selected render_shaded scene default;
gfx modify g_element lpt_nodes_left surfaces select_on material muscle selected_material default_selected render_shaded scene default;

#  Make the muscles invisible for the animation, they can be turned on later using the scene editor  
#  note: muscles are positioned for when the jaw is closed
gfx set visibility TMJ_disk off scene mandible;
gfx set visibility temp_nodes_right off;
gfx set visibility temp_nodes_left off;
gfx set visibility mass_nodes_right off;
gfx set visibility mass_nodes_left off;
gfx set visibility mpt_nodes_right off;
gfx set visibility mpt_nodes_left off;
gfx set visibility lpt_nodes_right off;
gfx set visibility lpt_nodes_left off;

if(!$ZINC) # If not using the Physiome Extension, ZINC. Because the extension doesn't have emoter support.
{
  # 
  # Emoter
  #
  # Create the basis
  #1..5 top
  #6..10 right fin
  #11..15 left fin
  #16,17 tail
  #18 19 eye

  # Create the basis with this external application
  #
  #emlinear_sgi -c full_linear.exnode -o test.basis -eo test.em -z full_linear.exnode all_def_1.exnode all_def_2.exnode all_def_3.exnode  all_def_4.exnode all_def_5.exnode all_def_6.exnode   all_def_7.exnode all_def_8.exnode all_def_9.exnode all_def_10.exnode all_def_11.exnode all_def_12.exnode all_def_13.exnode all_def_14.exnode all_def_15.exnode all_def_16.exnode all_def_17.exnode all_def_18.exnode all_def_19.exnode


  # Load the emoter and set the rigid body transformations to be applied to the scene
  gfx cre emoter basis $example/mandible.basis transformation_graphics_object mandible transformation_scene default
  set directory $example; #change to the examples directory because the master.em file contains relative paths
  gfx modify emoter load $example/master.em


  # Load the control curves (just setting the extend clamp, cycle or swing) 
  #

  # Turn
  gfx define curve "turn.em in master.em" c.Hermite number_of_components 1 extend_cycle file "$example/turn.em in master.em" max_value 1 min_value 0 parameter_grid 0.1 value_grid 0.1
  gfx define curve "turn.em in master.em timebase" l.Lagrange number_of_components 1 extend_cycle file "$example/turn.em in master.em timebase" max_value 5 min_value 0 parameter_grid 0.1 value_grid 0.1

  # Y
  gfx define curve "y.em in master.em" c.Hermite number_of_components 1 extend_cycle file "$example/y.em in master.em" max_value 1 min_value 0 parameter_grid 0.1 value_grid 0.1
  gfx define curve "y.em in master.em timebase" l.Lagrange number_of_components 1 extend_cycle file "$example/y.em in master.em timebase" max_value 5 min_value 0 parameter_grid 0.1 value_grid 0.1

  # Z
  gfx define curve "z.em in master.em" c.Hermite number_of_components 1 extend_cycle file "$example/z.em in master.em" max_value 1 min_value 0 parameter_grid 0.1 value_grid 0.1
  gfx define curve "z.em in master.em timebase" l.Lagrange number_of_components 1 extend_cycle file "$example/z.em in master.em timebase" max_value 5 min_value 0 parameter_grid 0.1 value_grid 0.1

gfx modify emoter play
}
