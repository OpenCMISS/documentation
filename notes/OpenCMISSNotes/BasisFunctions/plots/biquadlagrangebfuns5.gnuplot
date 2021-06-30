#set title "Biquadratic Lagrange basis functions"
set nokey
set samples 21
set isosample 11
set xlabel "$\\xione$"
set ylabel "$\\xitwo$"
set label 5 "$\\lbfn{5}{\\xione,\\xitwo}$" at 0.50, 0.50, 1.20 centre
#set xtics  0.00,0.25,1
#set ytics -0.25,0.25,1
psi5(x,y)=4.0*x*(1.0-x)*4.0*y*(1.0-y)
set xrange [0:1]
set yrange [0:1]
set zrange [-0.2:1]
splot psi5(x,y)

 
