import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BiHide, BiShow } from 'react-icons/bi';

// components
import './style.css';
import axiosInstance from '../../axios/AxiosInstance';
import { FormValidation } from '../../utils/FormValidation';
import { ScreenLoading } from '../../components/Loaders';

const Signup = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_no: '',
    password: '',
    confirm_password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const handleForm = async (e) => {
    e.preventDefault();
    const result = FormValidation(user);
    if (!result.validation) return toast.error(result.msg);

    setLoading(true); // for show loading screen after clicked on Sign Up button

    try {
      const {
        first_name: firstName,
        last_name: lastName,
        phone_no: phoneNo,
        ...rest
      } = user;

      const res = await axiosInstance.post('/user/signup', {
        firstName,
        lastName,
        phoneNo,
        ...rest,
      });
      localStorage.setItem('__f_id', res.data.userId);

      setLoading(false);

      navigate('/home', { replace: true });
    } catch (err) {
      setLoading(false);
      toast.error(err?.response?.data?.error || err?.message);
    }
  };

  return (
    <>
      {loading && <ScreenLoading backgroundColor="rgba(0,0,0,0.5)" />}

      <div className="signup-container">
        <form onSubmit={handleForm} className="signup-form-container">
          <h3>Create Your Account</h3>

          <div className="signup-input-container">
            <label htmlFor="first-name">First Name</label>
            <input
              id="first-name"
              type="text"
              name="first_name"
              onChange={handleInput}
            />
          </div>

          <div className="signup-input-container">
            <label htmlFor="last-name">Last Name</label>
            <input
              id="last-name"
              type="text"
              name="last_name"
              onChange={handleInput}
            />
          </div>

          <div className="signup-input-container">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              name="email"
              onChange={handleInput}
            />
          </div>

          <div className="signup-input-container">
            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              type="number"
              name="phone_no"
              onChange={handleInput}
            />
          </div>

          <div className="signup-input-container">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              onChange={handleInput}
            />
          </div>

          <div className="signup-input-container">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              id="confirm-password"
              type={showPassword ? 'text' : 'password'}
              name="confirm_password"
              onChange={handleInput}
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
          </div>

          <div>
            <input type="checkbox" required className="checkbox" />
            <span className="signup-terms-box">
              I agree to the Terms and condition
            </span>
          </div>
          <button className="signup-button">Sign Up</button>
          <h5>
            Already have account{' '}
            <Link to="/login">
              <span style={{ color: '#478ccd' }}>Click here</span>
            </Link>
          </h5>
        </form>

        {/* calling ErrorHandle() function component to show alert */}
        {
          // <ErrorHandle error={error} removeAction={loginErrorRemove} />
        }
      </div>
    </>
  );
};

export default Signup;
