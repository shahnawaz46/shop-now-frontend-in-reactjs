import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// components
import './style.css';
import axiosInstance from '../../axios/AxiosInstance';
import { ScreenLoading } from '../../components/Loaders';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  const formHandle = async (e) => {
    e.preventDefault();
    if (!email) return toast.error('Please Enter Email Address');
    if (!password) return toast.error('Please Enter Password');

    setLoading(true); // for show loading screen after clicked on Login button
    try {
      const res = await axiosInstance.post('/user/signin', { email, password });
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
    }
  };

  return (
    <>
      {loading && <ScreenLoading backgroundColor="rgba(0,0,0,0.5)" />}

      <div className="login-container">
        <div className="login-form-container">
          <h3>Login to your Account</h3>
          <form onSubmit={formHandle}>
            <div className="login-input-container">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="text"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="login-input-container">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button>Login</button>
          </form>
          <h5>Forgot your Password</h5>
          <span>or</span>
          <h5>
            Don't have account{' '}
            <Link to="/signup" style={{ color: '#478ccd' }}>
              Click here
            </Link>
          </h5>
        </div>
      </div>
    </>
  );
};

export default Login;
