import React, { useState, useEffect } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../axios/AxiosInstance";
import { toast } from "react-toastify";
// import { Link, useHistory } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { userLogin, loginErrorRemove } from '../../actions/LoginSignupAction';
// import ErrorHandle from '../js/ErrorHandle';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  // const dispatch = useDispatch()
  // const { authenticate, error } = useSelector((state) => state.user)

  const formHandle = async (e) => {
    e.preventDefault();
    console.log(email, password);
    try {
      const res = await axiosInstance.post("/user/signin", { email, password });
      // console.log(res)
      localStorage.setItem("__f_id", res.data.userId);
      navigate("/home", { replace: true });
      
    } catch (err) {
      if (err?.response?.data?.msg) {
        // console.log("Response ",err.response.data.msg)
        toast.error(err.response.data.msg);
      } else {
        // console.log("Error ",err)
        toast.error("Something went wrong please try again after some time");
      }
    }
    // dispatch(userLogin({ email, password }))
  };

  useEffect(() => {
    if (localStorage.getItem("__f_id")) navigate(-1);
  }, []);

  return (
    <div className="login-div">
      {/* <Link to="/home"><img src={logo} alt="Not Found" /></Link> */}
      {/* <Link to="/home"><h3><span style={{ color: "red" }}>FUZ</span>ICON</h3></Link> */}
      <div className="login-form">
        <h3>Login to your Account</h3>
        <form onSubmit={formHandle}>
          <h4>Email Address</h4>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <h4>Password</h4>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />{" "}
          <br />
          <button>Login</button>
        </form>
        <h5>Forgot your Password</h5>
        <span>or</span>
        <h5>
          Don't have account{" "}
          <Link to="/signup" style={{ color: "#478ccd" }}>
            Click here
          </Link>
        </h5>
      </div>

      {/* calling ErrorHandle() function component to show alert */}
      {
        // <ErrorHandle error={error} removeAction={loginErrorRemove} />
      }
    </div>
  );
};

export default Login;
