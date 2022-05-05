#set title "Bicubic Hermite basis functions"
set nokey
set samples 21
set isosample 21
set xlabel "$\\xione$"
set ylabel "$\\xitwo$"
set label 16 "$\\chbfn{4}{3}{\\xione,\\xitwo}$" at 0.00, 0.00, 0.05 centre
#set xtics  0.00,0.25,1
#set ytics -0.25,0.25,1
set ztics -0.03,0.015,0.03
phi10(z)=1.0-3.0*z*z+2.0*z*z*z
phi11(z)=z*(z-1.0)*(z-1.0)
phi20(z)=z*z*(3.0-2.0*z)
phi21(z)=z*z*(z-1.0)
psi16(x,y)=phi21(x)*phi21(y)
set xrange [0:1]
set yrange [0:1]
set zrange [-0.03:0.03]
splot psi16(x,y)
 
