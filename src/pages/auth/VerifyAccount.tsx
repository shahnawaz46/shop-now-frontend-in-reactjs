import { useRef, useState, useTransition } from 'react';
import { toast } from 'react-toastify';
import { Navigate, useLocation, useNavigate } from 'react-router';

// components
import './style.css';
import axiosInstance from '../../axios/AxiosInstance';
import { ScreenLoading } from '../../components/Loaders';
import FormTitle from '../../components/common/FormTitle';
import CustomButton from '../../components/common/CustomButton';
import { handleAxiosError } from '../../utils/HandleAxiosError';

const OTP_SIZE = 4;

const VerifyAccount = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [otp, setOtp] = useState<string[]>(new Array(OTP_SIZE).fill(''));
  const inputRef = useRef<(HTMLInputElement | null)[]>([]);

  const [isPending, startTransition] = useTransition();

  const handleUpdateOtp = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value: string = e.target.value;

    if (isNaN(Number(value))) return;

    const newValue: string = value.trim().slice(-1);
    const tempOtp = [...otp];
    tempOtp[index] = newValue;
    setOtp(tempOtp);

    if (newValue && index < OTP_SIZE) {
      inputRef.current[index + 1]?.focus();
    }
  };

  const handleRemoveOtp = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      console.log(index - 1);
      inputRef.current[index - 1]?.focus();
    }
  };

  const handleOTP = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!otp.every((value) => value)) {
      toast.error('OTP must be 4 digits');
      return;
    }

    startTransition(async () => {
      const userInfo = {
        otp: otp.reduce((acc, curr) => acc + curr),
        email: location?.search?.slice(1) || '',
      };

      try {
        const res = await axiosInstance.post('/verify', userInfo);
        localStorage.setItem('__f_id', res.data.userId);
        navigate('/', { replace: true });
      } catch (error) {
        handleAxiosError({ error });
      }
    });
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

          <form className="optverification-form" onSubmit={handleOTP}>
            {otp.map((value, index) => (
              <input
                type="text"
                ref={(e) => {
                  inputRef.current[index] = e;
                }}
                value={value}
                onChange={(e) => handleUpdateOtp(e, index)}
                onKeyDown={(e) => handleRemoveOtp(e, index)}
              />
            ))}

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
