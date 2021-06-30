#set title "Bilinear Lagrange basis functions"
set nokey
set samples 21
set isosample 11
set xlabel "$\\xione$"
set ylabel "$\\xione$"
set label 3 "$\\lbfn{3}{\\xione,\\xitwo}$" at 0.00, 1.00, 1.20 centre
#set xtics  0.00,0.25,1
#set ytics -0.25,0.25,1
psi3(x,y)=(1.0-x)*y
set xrange [0:1]
set yrange [0:1]
set zrange [0:1]
splot psi3(x,y)
 
