#set title "Biquadratic Lagrange basis functions"
set nokey
set samples 21
set isosample 21
set xlabel "$\\xione$"
set ylabel "$\\xitwo$"
set label 6 "$\\lbfn{6}{\\xione,\\xitwo}$" at 0.00, 0.00, 1.30 centre
#set xtics  0.00,0.25,1
#set ytics -0.25,0.25,1
phi1(z)=2.0*(z-0.5)*(z-1.0)
phi2(z)=4.0*z*(1.0-z)
phi3(z)=2.0*z*(z-0.5)
psi6(x,y)=phi3(x)*phi2(y)
set xrange [0:1]
set yrange [0:1]
set zrange [-0.2:1]
splot psi6(x,y)
 
