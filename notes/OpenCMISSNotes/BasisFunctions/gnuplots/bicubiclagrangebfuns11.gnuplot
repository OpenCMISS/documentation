#set title "Bicubic Lagrange basis functions"
set nokey
set samples 21
set isosample 21
set xlabel "$\\xione$"
set ylabel "$\\xitwo$"
set label 11 "$\\lbfn{11}{\\xione,\\xitwo}$" at 0.00, 0.00, 1.30 centre
#set xtics  0.00,0.25,1
#set ytics -0.25,0.25,1
phi1(z)=0.5*(3.0*z-1.0)*(3.0*z-2.0)*(1.0-z)
phi2(z)=4.5*z*(3.0*z-2.0)*(z-1.0)
phi3(z)=4.5*z*(3.0*z-1.0)*(1.0-z)
phi4(z)=0.5*z*(3.0*z-1.0)*(3.0*z-2.0)
psi11(x,y)=phi3(x)*phi3(y)
set xrange [0:1]
set yrange [0:1]
set zrange [-0.4:1.05]
splot psi11(x,y)

 
