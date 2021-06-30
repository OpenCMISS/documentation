#set title "Bicubic Lagrange basis functions"
set nokey
set samples 21
set isosample 11
set xlabel "$\\xione$"
set ylabel "$\\xitwo$"
set label 2  "$\\lbfn{2}{\\xione,\\xitwo}$"  at 0.33, 0.00, 1.20 centre
#set xtics  0.00,0.25,1
#set ytics -0.25,0.25,1
psi2(x,y)=  (9.0/4.0)*x*(3.0*x-2.0)*(x-1.0)*(3.0*y-1.0)*(3.0*y-2.0)*(1.0-y)
set xrange [0:1]
set yrange [0:1]
set zrange [-0.4:1]
splot psi2(x,y)

 
