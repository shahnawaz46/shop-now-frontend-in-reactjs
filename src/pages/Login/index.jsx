import React, { useState } from 'react';
import './style.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

// components
import axiosInstance from '../../axios/AxiosInstance';
import { fetchPersonalDetails } from '../../redux/slices/UserSlice';

const Login = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const formHandle = async (e) => {
    e.preventDefault();
    if (!email) return toast.error('Please Enter Email Address');
    if (!password) return toast.error('Please Enter Password');

    try {
      const res = await axiosInstance.post('/user/signin', { email, password });
      localStorage.setItem('__f_id', res.data.userId);
      if (location.state) {
        dispatch(fetchPersonalDetails());
        navigate(location.state.from, { replace: true });
      } else {
        navigate('/my-account/address', { replace: true });
      }
    } catch (err) {
      toast.error(err?.response?.data?.error || err?.message);
    }
  };

  return (
    <div className='login-container'>
      <div className='login-form-container'>
        <h3>Login to your Account</h3>
        <form onSubmit={formHandle}>
          <div className='login-input-container'>
            <label htmlFor='email'>Email Address</label>
            <input
              id='email'
              type='text'
              name='email'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='login-input-container'>
            <label htmlFor='password'>Password</label>
            <input
              id='password'
              type='password'
              name='password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button>Login</button>
        </form>
        <h5>Forgot your Password</h5>
        <span>or</span>
        <h5>
          Don't have account{' '}
          <Link to='/signup' style={{ color: '#478ccd' }}>
            Click here
          </Link>
        </h5>
      </div>
    </div>
  );
};

export default Login;
