import React, { useState, useEffect } from 'react';
import './style.css';
import { Link } from 'react-router-dom';
// import { Link, useHistory } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { userLogin, loginErrorRemove } from '../../actions/LoginSignupAction';
// import ErrorHandle from '../js/ErrorHandle';


const Login = () => {
    // const history = useHistory()

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    // const dispatch = useDispatch()
    // const { authenticate, error } = useSelector((state) => state.user)

    const formHandle = (e) => {
        e.preventDefault();
        // dispatch(userLogin({ email, password }))
    }

    // useEffect(() => {
    //     if (authenticate)
    //         history.goBack()
    // }, [authenticate])

    return (
        <div className="login-div">
            {/* <Link to="/home"><img src={logo} alt="Not Found" /></Link> */}
            {/* <Link to="/home"><h3><span style={{ color: "red" }}>FUZ</span>ICON</h3></Link> */}
            <div className="login-form">
                <h3>Login to your Account</h3>
                <form onSubmit={formHandle}>
                    <h4>Email Address</h4>
                    <input type="email" onChange={(e) => setEmail(e.target.value)} required />
                    <h4>Password</h4>
                    <input type="password" onChange={(e) => setPassword(e.target.value)} required /> <br />
                    <button>Login</button>
                </form>
                <h5>Forgot your Password</h5>
                <span>or</span>
                <h5>Don't have account <Link to="/signup" style={{ color: '#478ccd' }}>Click here</Link></h5>
            </div>


            {/* calling ErrorHandle() function component to show alert */}
            {
                // <ErrorHandle error={error} removeAction={loginErrorRemove} />
            }
        </div>
    );
};

export default Login;
