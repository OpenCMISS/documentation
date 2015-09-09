gfx modify g_element skins/final_skin surfaces exterior select_on material tissue selected_material default_selected render_shaded $is_delete;

gfx modify g_element zonules/zonules cylinders constant_radius 0.02 select_on material white selected_material default_selected $is_delete;

gfx modify g_element veins/veins cylinders constant_radius 0.05 select_on material blue selected_material default_selected $is_delete;

gfx modify g_element arteries/arteries cylinders constant_radius 0.05 select_on material muscle selected_material default_selected $is_delete;

gfx modify g_element retina/retina surfaces select_on material photo_mapped_retina texture_coordinates xi_texture_coordinates_retina selected_material default_selected render_shaded exterior face xi2_0 $is_delete;

gfx modify g_element retina/retina surfaces select_on material photo_mapped_retina texture_coordinates xi_texture_coordinates_retina selected_material default_selected render_shaded exterior face xi2_1 $is_delete;

gfx modify g_element retina/macula surfaces select_on material macula selected_material default_selected render_shaded face xi2_0 $is_delete;

gfx modify g_element choroid_back/choroid2_fitted surfaces select_on material eye_photo_mapped_choroid texture_coordinates xi_texture_coordinates_choroid selected_material default_selected render_shaded exterior face xi2_0 $is_delete;

gfx modify g_element choroid/ciliaryBody surfaces exterior face xi2_0 select_on material ciliaryBody selected_material default_selected render_shaded exterior $is_delete;

gfx modify g_element choroid/ciliaryBody surfaces exterior face xi2_1 select_on material ciliaryBody selected_material default_selected render_shaded exterior $is_delete;

gfx modify g_element sclera/sclera surfaces as "sclera_surfaces" select_on material sclera selected_material default_selected render_shaded exterior face xi2_0 $is_delete;

gfx modify g_element medrect/medrect surfaces select_on material muscle selected_material default_selected render_shaded $is_delete;

gfx modify g_element latrect/latrect surfaces select_on material muscle selected_material default_selected render_shaded $is_delete;

gfx modify g_element infrec/infrec surfaces select_on material muscle selected_material default_selected render_shaded $is_delete;

gfx modify g_element suprec/suprec surfaces select_on material muscle selected_material default_selected render_shaded $is_delete;

gfx modify g_element infobl/infobl surfaces select_on material muscle selected_material default_selected render_shaded $is_delete;

gfx modify g_element supobl/supobl surfaces select_on material muscle selected_material default_selected render_shaded $is_delete;

gfx modify g_element opticNerve/opticNerve surfaces select_on material optNrv selected_material default_selected render_shaded $is_delete;

gfx modify g_element bone/fitted_orbit surfaces select_on material bone selected_material default_selected render_shaded $is_delete;

gfx modify g_element trochlea/trochlea_moved surfaces select_on material tissue selected_material default_selected render_shaded $is_delete;

gfx modify g_element sclera/cornea surfaces exterior face xi2_0 select_on material cornea selected_material default_selected render_shaded $is_delete;

gfx modify g_element lens/lens surfaces select_on material lens selected_material default_selected render_shaded exterior $is_delete;

