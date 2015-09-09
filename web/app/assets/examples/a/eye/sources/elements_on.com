gfx create material red normal_mode ambient 0.5 0 0 diffuse 0.93 0 0 emission 0 0 0 specular 0.2 0.2 0.2 alpha 1 shininess 0.2;


gfx create material choroidLine normal_mode ambient 0.62 0.22 0.11 diffuse 1 0.57 0 emission 0 0 0 specular 0 0 0 alpha 1 shininess 0;

gfx create material ciliaryBodyLine normal_mode ambient 0.4 0.14 0.11 diffuse 0.91 0 0 emission 0 0 0 specular 0.3 0.5 0.5 alpha 1 shininess 0.11;

##gfx create material zonules normal_mode ambient 0 0 1 diffuse 0 0.62 1 emission 0 0 0 specular 0.13 0.2 0.2 alpha 1 shininess 0.05;

gfx modify g_element skins/final_skin lines select_on material tissue selected_material default_selected $is_delete;

gfx modify g_element zonules/zonules lines line_width 1.5 select_on material white selected_material default_selected $is_delete;

gfx modify g_element veins/veins lines line_width 2 select_on material blue selected_material default_selected $is_delete;

gfx modify g_element arteries/arteries lines line_width 2 select_on material red selected_material default_selected;

gfx modify g_element retina/retina lines exterior select_on material gold selected_material default_selected $is_delete;

gfx modify g_element retina/macula lines face xi2_0 select_on material yellow selected_material default_selected $is_delete;

gfx modify g_element choroid/iris lines exterior select_on material white selected_material default_selected $is_delete;

gfx modify g_element choroid/ciliaryBody lines exterior select_on material ciliaryBodyLine selected_material default_selected $is_delete;

gfx modify g_element choroid_back/choroid2_fitted lines exterior face xi2_0 select_on material choroidLine selected_material default_selected $is_delete;

gfx modify g_element sclera/sclera lines as "line1" exterior face xi2_0 select_on material white selected_material default_selected $is_delete;

gfx modify g_element medrect/medrect lines select_on material red selected_material default_selected $is_delete;

gfx modify g_element latrect/latrect lines select_on material red selected_material default_selected $is_delete;

gfx modify g_element infrec/infrec lines select_on material red selected_material default_selected $is_delete;

gfx modify g_element suprec/suprec lines select_on material red selected_material default_selected $is_delete;

gfx modify g_element infobl/infobl lines select_on material red selected_material default_selected $is_delete;

gfx modify g_element supobl/supobl lines select_on material red selected_material default_selected $is_delete;

gfx modify g_element opticNerve/opticNerve lines select_on material optNrv selected_material default_selected $is_delete;

gfx modify g_element bone/fitted_orbit lines select_on material bone selected_material default_selected $is_delete;

gfx modify g_element trochlea/trochlea_moved lines select_on material tissue selected_material default_selected $is_delete;

gfx modify g_element lens/lens lines exterior select_on material bone selected_material default_selected $is_delete;

gfx modify g_element sclera/cornea lines exterior face xi2_0 select_on material bone selected_material default_selected $is_delete;
