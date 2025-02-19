import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deviceDetect, browserName } from 'react-device-detect';

// components
import './style.css';
import axiosInstance from '../../axios/AxiosInstance';
import { ScreenLoading } from '../../components/Loaders';
import { Field, Form, Formik } from 'formik';
import { initialState, signInSchema } from '../../validation/SignIn.yup';
import FormikErrorMsg from '../../components/common/FormikErrorMsg';
import FormTitle from '../../components/common/FormTitle';
import CustomButton from '../../components/common/CustomButton';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [deviceInfo, setDeviceInfo] = useState({});

  const handleFormSubmit = async (value) => {
    setLoading(true); // for show loading screen after clicked on Login button
    try {
      const res = await axiosInstance.post('/user/signin', {
        ...value,
        ...deviceInfo,
      });
      localStorage.setItem('__f_id', res.data.userId);

      setLoading(false);

      if (location.state) {
        navigate(`/place-order?step=1`, {
          state: location.state,
          replace: true,
        });
      } else {
        navigate('/my-account/address', { replace: true });
      }
    } catch (err) {
      setLoading(false);
      toast.error(err?.response?.data?.error || err?.message);

      if (err?.response?.data?.error === 'User not verified, Please verify') {
        navigate(`/account/verify?${value.email}`, { replace: true });
      }
    }
  };

  useEffect(() => {
    (function () {
      try {
        const device = deviceDetect();
        const info = {
          device: device?.osName || device?.os,
          browser: browserName,
        };
        setDeviceInfo(info);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <>
      {loading && <ScreenLoading backgroundColor="rgba(0,0,0,0.5)" />}

      <div className="form-container">
        <div className="form-sub-container">
          <FormTitle text={'Login to your Account'} />

          <Formik
            initialValues={initialState}
            validationSchema={signInSchema}
            onSubmit={(value) => handleFormSubmit(value)}
          >
            {({ handleSubmit }) => (
              <Form>
                <div className="input-container">
                  <Field name="email" placeholder="Email Address" />

                  <FormikErrorMsg name={'email'} />
                </div>

                <div className="input-container">
                  <Field
                    name="password"
                    type="password"
                    placeholder="Password"
                  />

                  <FormikErrorMsg name={'password'} />
                </div>

                <CustomButton
                  text={'Login'}
                  type="submit"
                  onClick={handleSubmit}
                />
              </Form>
            )}
          </Formik>

          {/* <h5>Forgot your Password</h5>
          <span>or</span> */}
          <h5>
            Don&apos;t have account{' '}
            <Link to="/account/signup" style={{ color: '#478ccd' }}>
              Click here
            </Link>
          </h5>
        </div>
      </div>
    </>
  );
};

export default Login;
