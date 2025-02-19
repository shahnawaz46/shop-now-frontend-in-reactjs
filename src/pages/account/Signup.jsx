import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BiHide, BiShow } from 'react-icons/bi';
import { deviceDetect, browserName } from 'react-device-detect';
import { Formik, Form, Field } from 'formik';

// components
import './style.css';
import axiosInstance from '../../axios/AxiosInstance';
import { ScreenLoading } from '../../components/Loaders';
import { initialState, signUpSchema } from '../../validation/SignUp.yup';
import FormikErrorMsg from '../../components/common/FormikErrorMsg';
import FormTitle from '../../components/common/FormTitle';
import CustomButton from '../../components/common/CustomButton';

const Signup = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [maxDate, setMaxDate] = useState();
  const [deviceInfo, setDeviceInfo] = useState({});

  const handleFormSubmit = async (value) => {
    setLoading(true); // for show loading screen after clicked on Sign Up button

    try {
      const res = await axiosInstance.post('/user/signup', {
        ...value,
        ...deviceInfo,
      });

      navigate(`/account/verify?${res.data.email}`, { replace: true });
    } catch (err) {
      setLoading(false);
      toast.error(err?.response?.data?.error || err?.message);
    }
  };

  useEffect(() => {
    const date = new Date();
    const lastYear = date.getFullYear() - 10;
    setMaxDate(`${lastYear}-01-01`);
  }, []);

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
        <div className="form-sub-container signup-container">
          <FormTitle text={'Create Your Account'} />

          <Formik
            initialValues={initialState}
            validationSchema={signUpSchema}
            onSubmit={(value) => handleFormSubmit(value)}
          >
            {({ handleSubmit }) => (
              <Form>
                <div className="input-flex">
                  <div className="input-container">
                    <Field name="firstName" placeholder="First Name" />

                    <FormikErrorMsg name={'firstName'} />
                  </div>

                  <div className="input-container">
                    <Field name="lastName" placeholder="Last Name" />

                    <FormikErrorMsg name={'lastName'} />
                  </div>
                </div>

                <div className="input-container">
                  <Field
                    name="email"
                    type="email"
                    placeholder="Email Address"
                  />

                  <FormikErrorMsg name={'email'} />
                </div>

                <div className="input-container">
                  <Field
                    name="phoneNo"
                    type="number"
                    placeholder="Phone Number"
                  />

                  <FormikErrorMsg name={'phoneNo'} />
                </div>

                <div className="input-container">
                  <Field
                    name="dob"
                    type="date"
                    placeholder="Date of Birth"
                    max={maxDate}
                  />

                  <FormikErrorMsg name={'dob'} />
                </div>

                <div className="input-flex">
                  <div className="input-container">
                    <Field
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                    />

                    <FormikErrorMsg name={'password'} />
                  </div>

                  <div className="input-container">
                    <Field
                      name="confirm_password"
                      type={showPassword ? 'text' : 'password'}
                      style={{ paddingRight: '40px' }}
                      placeholder="Confirm Password"
                    />

                    {showPassword ? (
                      <BiShow
                        className="confirm-password-icon"
                        onClick={() => setShowPassword(false)}
                      />
                    ) : (
                      <BiHide
                        className="confirm-password-icon"
                        onClick={() => setShowPassword(true)}
                      />
                    )}

                    <FormikErrorMsg name={'confirm_password'} />
                  </div>
                </div>

                <div className="input-container">
                  <div>
                    <Field
                      name="checked"
                      type="checkbox"
                      className="checkbox"
                    />
                    <span>I agree to the Terms and conditions</span>
                  </div>

                  <FormikErrorMsg name={'checked'} />
                </div>

                <CustomButton
                  text={'Register'}
                  type="submit"
                  onClick={handleSubmit}
                />
              </Form>
            )}
          </Formik>

          <h5>
            Already have account{' '}
            <Link to="/account/login">
              <span style={{ color: '#478ccd' }}>Click here</span>
            </Link>
          </h5>
        </div>
      </div>
    </>
  );
};

export default Signup;
