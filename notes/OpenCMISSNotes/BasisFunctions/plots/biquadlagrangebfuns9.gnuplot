#set title "Biquadratic Lagrange basis functions"
set nokey
set samples 21
set isosample 11
set xlabel "$\\xione$"
set ylabel "$\\xitwo$"
set label 9 "$\\lbfn{9}{\\xione,\\xitwo}$" at 1.00, 1.00, 1.20 centre
#set xtics  0.00,0.25,1
#set ytics -0.25,0.25,1
psi9(x,y)=2.0*x*(x-0.5)*2.0*y*(y-0.5)
set xrange [0:1]
set yrange [0:1]
set zrange [-0.2:1]
splot psi9(x,y)

 
