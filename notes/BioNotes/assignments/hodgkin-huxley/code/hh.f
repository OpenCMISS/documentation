      PROGRAM HODGKIN_HUXLEY

C**** Solution of Hodgkin-Huxley equations.

      IMPLICIT NONE

!     Common blocks
      REAL*8 Cap,gNa,gK,gL,VNa,VK,VL
      COMMON /params/ Cap,gNa,gK,gL,VNa,VK,VL
      REAL*8 Tstim,Istim
      COMMON /stim/ Tstim,Istim
      INTEGER MAXN
      PARAMETER(MAXN=1000)
      INTEGER count
      REAL*4 Time(MAXN),Voltage(MAXN),K_current(MAXN),Na_current(MAXN),
     '  L_current(MAXN),m_value(MAXN),h_value(MAXN),n_value(MAXN)
      COMMON /graphics/ count,Time,Voltage,K_current,Na_current,
     '  L_current,m_value,h_value,n_value
!     Local Variables
      INTEGER IFAIL,Neqns,IRELAB
      REAL*8 Tbegin,Tend,TOL,Y(4)
      REAL*8 W(200)
      EXTERNAL HH,OUTPUT,DUMMY

      Neqns=4

! Set parameters
      Cap= 1.0d0      !uF/cm2
      gNa= 120.0d0    !mS/cm2
      gK = 36.0d0     !mS/cm2
      gL = 0.3d0      !mS/cm2
      VNa= 40.0d0     !mV 
      VK = -87.0d0    !mV
      VL = -64.4011d0 !mV
      count=0

! Initialise variables      
!      write(*,'($'' Enter initial V: '')')
!      read(*,*) Y(1)
      Y(1)=-75.0d0   !V
      write(*,'($'' Enter stimulus time: '')')
      read(*,*) Tstim
      write(*,'($'' Enter stimulus magnitude: '')')
      read(*,*) Istim
      Y(2) = 0.0d0  !m
      Y(3) = 1.0d0    !h
      Y(4) = 0.0d0  !n

      Tbegin = 0.0d0
      Tend = 2.0d1

! Solve o.d.e.s
      IFAIL=1
      IRELAB=0
      TOL=1.0d-7
      CALL D02EBF(Tbegin,Tend,Neqns,Y,TOL,IRELAB,HH,0,DUMMY,
     '  OUTPUT,W,200,IFAIL)
      IF(IFAIL.NE.0) THEN
         WRITE(*,'('' IFAIL='',I2)') IFAIL
      ENDIF

! Plot graphics
      CALL PLOTGRAPHS()

      STOP
      END


      SUBROUTINE HH(t,Y,F)

C**** Computes Hodgkin-Huxley equations.
C**** Voltage is in mV & time in ms.
C**** ALPHA(1) is alpha_m
C**** ALPHA(2) is alpha_h
C**** ALPHA(3) is alpha_n
C**** BETA(1)  is beta_m
C**** BETA(2)  is beta_h
C**** BETA(3)  is beta_n

      IMPLICIT NONE

!     Parameter List
      REAL*8 t,Y(*),F(*)
!     Common blocks
      REAL*8 Cap,gNa,gK,gL,VNa,VK,VL
      COMMON /params/ Cap,gNa,gK,gL,VNa,VK,VL
      REAL*8 Tstim,Istim
      COMMON /stim/ Tstim,Istim
!     Local Variables
      REAL*8 ALPHA(3),BETA(3),V,m,h,n,I_stim

      V=Y(1)
      m=Y(2)
      h=Y(3)
      n=Y(4)

      IF(t.GE.Tstim.AND.t.LE.(Tstim+0.5d0)) THEN
        I_stim=Istim
      ELSE
        I_stim=0.0d0
      ENDIF
       
! Compute rate constants
      IF(DABS(-50.0d0-V).GT.1.0d-4) THEN
        ALPHA(1)= 0.10d0*(-50.0d0-V)/(DEXP(0.1d0*(-50.0d0-V)) - 1.0d0)
      ELSE
        ALPHA(1)= 1.0d0
      ENDIF
      ALPHA(2)= 0.07d0*DEXP((-75.0d0-V)/20.0d0)
      IF(DABS(-65.0d0-V).GT.1.0d-4) THEN
        ALPHA(3)= 0.01d0*(-65.0d0-V)/(DEXP(0.1d0*(-65.0d0-V)) - 1.0d0)
      ELSE
        ALPHA(3)= 1.0d0
      ENDIF

      BETA(1) = 4.0d0*DEXP((-75.0d0-V)/18.0d0)
      BETA(2) = 1.0d0/(DEXP(0.1d0*(-45.0d0-V)) + 1.0d0)
      BETA(3) = 0.125d0*DEXP((-75.0d0-V)/80.0d0)

! Compute o.d.e. RHSs 
      F(1)= (I_stim - (gNa*m*m*m*h*(V-VNa) + gK*n*n*n*n*(V-VK) 
     '  + gL*(V-VL)))/Cap
      F(2)=  ALPHA(1)*(1.0d0-m) - BETA(1)*m
      F(3)=  ALPHA(2)*(1.0d0-h) - BETA(2)*h
      F(4)=  ALPHA(3)*(1.0d0-n) - BETA(3)*n

      RETURN
      END


      SUBROUTINE OUTPUT(t,Y)

C**** Output routine for HH solver.

      IMPLICIT NONE

!     Parameter List
      REAL*8 t,Y(*)
!     Common blocks
      REAL*8 Cap,gNa,gK,gL,VNa,VK,VL
      COMMON /params/ Cap,gNa,gK,gL,VNa,VK,VL
      REAL*8 Tstim,Istim
      COMMON /stim/ Tstim,Istim
      INTEGER MAXN
      PARAMETER(MAXN=1000)
      INTEGER count
      REAL*4 Time(MAXN),Voltage(MAXN),K_current(MAXN),Na_current(MAXN),
     '  L_current(MAXN),m_value(MAXN),h_value(MAXN),n_value(MAXN)
      COMMON /graphics/ count,Time,Voltage,K_current,Na_current,
     '  L_current,m_value,h_value,n_value
!     Local Variables
      REAL*8 V,m,h,n,I_Na,I_K,I_L

      V = Y(1)
      m = Y(2)
      h = Y(3)
      n = Y(4)

      I_Na = gNa*m*m*m*h*(V-VNa)
      I_K  = gK*n*n*n*n*(V-VK)
      I_L  = gL*(V-VL)

      count=count+1

      Time(count)=t
      Voltage(count)=V
      K_current(count)=I_K
      Na_current(count)=I_Na
      L_current(count)=I_L
      m_value(count)=m
      h_value(count)=h
      n_value(count)=n

      IF(t.GE.Tstim.AND.t.LE.Tstim+0.5d0) THEN
        WRITE(*,'('' t='',F6.3,'' V='',F7.3,'' m='',F5.3,'
     '    //''' h='',F5.3,'' n='',F5.3,'' I_Na='',D11.3,'
     '    //''' I_K='',D11.3,'' Istim='',D11.3)') t,Y(1),
     '    Y(2),Y(3),Y(4),I_Na,I_K,Istim
      ELSE
        WRITE(*,'('' t='',F6.3,'' V='',F7.3,'' m='',F5.3,'
     '    //''' h='',F5.3,'' n='',F5.3,'' I_Na='',D11.3,'
     '    //''' I_K='',D11.3)') t,Y(1),Y(2),Y(3),Y(4),I_Na,I_K
      ENDIF

      t=t+0.1d0

      RETURN
      END


      SUBROUTINE DUMMY()

      RETURN
      END


      SUBROUTINE PLOTGRAPHS()

      IMPLICIT NONE

      INCLUDE '/usr/local/include/gx.inc'

!     Common blocks
      REAL*8 Tstim,Istim
      COMMON /stim/ Tstim,Istim
      INTEGER MAXN
      PARAMETER(MAXN=1000)
      INTEGER count
      REAL*4 Time(MAXN),Voltage(MAXN),K_current(MAXN),Na_current(MAXN),
     '  L_current(MAXN),m_value(MAXN),h_value(MAXN),n_value(MAXN)
      COMMON /graphics/ count,Time,Voltage,K_current,Na_current,
     '  L_current,m_value,h_value,n_value
!     Local variables
      INTEGER choice,err,i
      REAL*4 min,max,winrct(4),wldrct(4),xpts(MAXN),ypts(MAXN)

      DATA winrct /0.38,0.25,1.18,0.65/

      CALL opgrph(err)
      WRITE(*,'(/,'' Enter the type of variable to plot '
     '  //'(0 to finish):'')')
      WRITE(*,'('' (1) Membrane voltage'')')
      WRITE(*,'('' (2) Ionic currents'')')
      WRITE(*,'('' (3) Gate variables'')')
      READ(*,*) choice
 10   IF(choice.GE.1.AND.choice.LE.3) THEN
        CALL opwin(1,winrct,err)
        CALL setwin(1,err)
        min=9.9e-30
        max=-9.9e30
        IF(choice.eq.1) THEN
          DO i=1,count
            IF(Voltage(i).gt.max) max=Voltage(i)
            IF(Voltage(i).lt.min) min=Voltage(i)
          ENDDO          
          wldrct(1)=-0.5
          wldrct(2)=min*1.1
          wldrct(3)=21.0
          wldrct(4)=max*1.1
        ELSEIF(choice.eq.2) THEN
          DO i=1,count
            IF(Na_current(i).gt.max) max=Na_current(i)
            IF(Na_current(i).lt.min) min=Na_current(i)
            IF(K_current(i).gt.max) max=K_current(i)
            IF(K_current(i).lt.min) min=K_current(i)
            IF(L_current(i).gt.max) max=L_current(i)
            IF(L_current(i).lt.min) min=L_current(i)
          ENDDO
          wldrct(1)=-0.5
          wldrct(2)=min*1.1
          wldrct(3)=21.0
          wldrct(4)=max*1.1
        ELSEIF(choice.eq.3) THEN
          max=1.0
          min=0.0
          wldrct(1)=-0.5
          wldrct(2)=-0.1
          wldrct(3)=21.0
          wldrct(4)=1.1
        ENDIF  
        CALL setview(wldrct,err)
        CALL opobjt(1,err)
        CALL slnclr(gxBLACK,err)
        CALL slntyp(gxSOLID,err)
        CALL slnwdh(gxTHIN,err)
        xpts(1)=0.0
        xpts(2)=20.0
        ypts(1)=0.0
        ypts(2)=0.0
        CALL drwpln(2,xpts,ypts,err)
        xpts(1)=0.0
        xpts(2)=0.0
        ypts(1)=min
        ypts(2)=max
        CALL drwpln(2,xpts,ypts,err)
        CALL slnwdh(gxTHICK,err)
        xpts(1)=Tstim
        xpts(2)=Tstim
        ypts(1)=min
        ypts(2)=max
        CALL drwpln(2,xpts,ypts,err)
        CALL clobjt(err)
        CALL gxwait(0.0,err)
        CALL opobjt(2,err)
        CALL slnwdh(gxTHIN,err)
        DO i=1,count
          xpts(i)=Time(i)
        ENDDO
        IF(choice.eq.1) THEN
          CALL slnclr(gxBLUE,err)
          DO i=1,count
            ypts(i)=Voltage(i)
          ENDDO
          CALL drwpln(count,xpts,ypts,err)
        ELSEIF(choice.eq.2) THEN
          CALL slnclr(gxBLUE,err)
          DO i=1,count
            ypts(i)=Na_current(i)
          ENDDO
          CALL drwpln(count,xpts,ypts,err)
          CALL slnclr(gxRED,err)
          DO i=1,count
            ypts(i)=K_current(i)
          ENDDO
          CALL drwpln(count,xpts,ypts,err)
          CALL slnclr(gxGREEN,err)
          DO i=1,count
            ypts(i)=L_current(i)
          ENDDO
          CALL drwpln(count,xpts,ypts,err)
        ELSEIF(choice.eq.3) THEN
          CALL slnclr(gxBLUE,err)
          DO i=1,count
            ypts(i)=m_value(i)
          ENDDO
          CALL drwpln(count,xpts,ypts,err)
          CALL slnclr(gxRED,err)
          DO i=1,count
            ypts(i)=h_value(i)
          ENDDO
          CALL drwpln(count,xpts,ypts,err)
          CALL slnclr(gxGREEN,err)
          DO i=1,count
            ypts(i)=n_value(i)
          ENDDO
          CALL drwpln(count,xpts,ypts,err)
        ENDIF
        CALL clobjt(err)
        CALL gxwait(0.0,err)
        WRITE(*,'(/,'' Enter the type of variable to plot '
     '    //'(0 to finish):'')')
        WRITE(*,'('' (1) Membrane voltage'')')
        WRITE(*,'('' (2) Ionic currents'')')
        WRITE(*,'('' (3) Gate variables'')')
        READ(*,*) choice
        CALL dlobjt(1,err)
        CALL dlobjt(2,err)
        CALL clwin(1,err)
        GOTO 10
      ENDIF
      CALL clgrph(err)

      RETURN
      END

