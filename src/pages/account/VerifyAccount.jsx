import { useState, useTransition } from 'react';
import { toast } from 'react-toastify';
import { Navigate, useLocation, useNavigate } from 'react-router';

// components
import './style.css';
import axiosInstance from '../../axios/AxiosInstance';
import { ScreenLoading } from '../../components/Loaders';
import FormTitle from '../../components/common/FormTitle';
import CustomButton from '../../components/common/CustomButton';

const VerifyAccount = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [otp, setOtp] = useState({});
  const [isPending, startTransition] = useTransition();

  const optHanlde = async (e) => {
    e.preventDefault();

    const allOtp = otp.otp1 + otp.otp2 + otp.otp3 + otp.otp4;

    if (allOtp.length !== 4) {
      toast.error('OTP must be 4 digits');
      return;
    }

    startTransition(async () => {
      const userInfo = { otp: allOtp, email: location?.search?.slice(1) || '' };

      try {
        const res = await axiosInstance.post('/verify', userInfo);
        localStorage.setItem('__f_id', res.data.userId);
        navigate('/', { replace: true });
      } catch (err) {
        toast.error(err?.response?.data?.error || err?.message);
      }
    });
  };

  const setOtpFnc = (e, index) => {
    const tempOtp = { ...otp };
    if (e.key === ' ') return;
    else if (e.key === 'Backspace')
      if (index === 0) return;
      else if (tempOtp[e.target.name]) {
        delete tempOtp[e.target.name];
        setOtp(tempOtp);
      } else e.target.form.elements[index - 1].focus();
    else {
      setOtp({ ...tempOtp, [e.target.name]: e.target.value });
      e.target.form.elements[index + 1].focus();
    }
  };

  if (localStorage.getItem('chat_user')) return <Navigate to={'/'} replace />;

  return (
    <>
      {isPending && <ScreenLoading backgroundColor="rgba(0,0,0,0.5)" />}

      <div className="form-container">
        <div className="form-sub-container otpverification-container">
          <FormTitle text={'Email Verification'} alignItems="center">
            <p
              style={{
                textAlign: 'center',
                marginTop: '12px',
                color: 'var(--text-primary)',
              }}
            >
              Please Enter the 4 Digit Code Sent to Your Mail
            </p>
            <p
              style={{
                color: 'var(--text-primary)',
              }}
            >
              {location?.search?.slice(1)}
            </p>
          </FormTitle>

          <form className="optverification-form" onSubmit={optHanlde}>
            <input
              type="text"
              maxLength={1}
              name="otp1"
              required
              onKeyUp={(e) => setOtpFnc(e, 0)}
            />
            <input
              type="text"
              maxLength={1}
              name="otp2"
              required
              onKeyUp={(e) => setOtpFnc(e, 1)}
            />
            <input
              type="text"
              maxLength={1}
              name="otp3"
              required
              onKeyUp={(e) => setOtpFnc(e, 2)}
            />
            <input
              type="text"
              maxLength={1}
              name="otp4"
              required
              onKeyUp={(e) => setOtpFnc(e, 3)}
            />
            <div style={{ marginTop: '30px' }}>
              <CustomButton
                text={'Verify'}
                type="submit"
                className={'form-btn verify-form-btn'}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default VerifyAccount;
