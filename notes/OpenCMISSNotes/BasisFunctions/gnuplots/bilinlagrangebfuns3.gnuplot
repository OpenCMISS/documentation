#set title "Bilinear Lagrange basis functions"
set nokey
set samples 21
set isosample 21
set xlabel "$\\xione$"
set ylabel "$\\xione$"
set label 3 "$\\lbfn{3}{\\xione,\\xitwo}$" at 0.00, 0.00, 1.30 centre
#set xtics  0.00,0.25,1
#set ytics -0.25,0.25,1
phi1(z)=(1.0-z)
phi2(z)=z
psi3(x,y)=phi1(x)*phi2(y)
set xrange [0:1]
set yrange [0:1]
set zrange [0:1]
splot psi3(x,y)
 
