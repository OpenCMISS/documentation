#set title "Biquadratic Lagrange basis functions"
set nokey
set samples 21
set isosample 11
set xlabel "$\xi_1$"
set ylabel "$\xi_2$"
set label 1 "$\lbfn{1}{\xi_1,\xi_2}$" at 0.00, 0.00, 1.20 centre
set label 2 "$\lbfn{2}{\xi_1,\xi_2}$" at 0.50, 0.00, 1.20 centre
set label 3 "$\lbfn{3}{\xi_1,\xi_2}$" at 1.00, 0.00, 1.20 centre
set label 4 "$\lbfn{4}{\xi_1,\xi_2}$" at 0.00, 0.50, 1.20 centre
set label 5 "$\lbfn{5}{\xi_1,\xi_2}$" at 0.50, 0.50, 1.20 centre
set label 6 "$\lbfn{6}{\xi_1,\xi_2}$" at 1.00, 0.50, 1.20 centre
set label 7 "$\lbfn{7}{\xi_1,\xi_2}$" at 0.00, 1.00, 1.20 centre
set label 8 "$\lbfn{8}{\xi_1,\xi_2}$" at 0.50, 1.00, 1.20 centre
set label 9 "$\lbfn{9}{\xi_1,\xi_2}$" at 1.00, 1.00, 1.20 centre
#set xtics  0.00,0.25,1
#set ytics -0.25,0.25,1
psi1(x,y)=2.0*(x-0.5)*(x-1.0)*2.0*(y-0.5)*(y-1.0)
psi2(x,y)=4.0*x*(1.0-x)*2.0*(y-0.5)*(y-1.0)
psi3(x,y)=2.0*x*(x-0.5)*2.0*(y-0.5)*(y-1.0)
psi4(x,y)=2.0*(x-0.5)*(x-1.0)*4.0*y*(1.0-y)
psi5(x,y)=4.0*x*(1.0-x)*4.0*y*(1.0-y)
psi6(x,y)=2.0*x*(x-0.5)*4.0*y*(1.0-y)
psi7(x,y)=2.0*(x-0.5)*(x-1.0)*2.0*y*(y-0.5)
psi8(x,y)=4.0*x*(1.0-x)*2.0*y*(y-0.5)
psi9(x,y)=2.0*x*(x-0.5)*2.0*y*(y-0.5)
set xrange [0:1]
set yrange [0:1]
set zrange [0:1]
splot psi1(x,y),psi2(x,y),psi3(x,y),psi4(x,y),psi5(x,y),psi6(x,y),psi7(x,y),psi8(x,y),psi9(x,y)
 
