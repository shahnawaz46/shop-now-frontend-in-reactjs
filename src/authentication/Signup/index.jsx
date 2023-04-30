import React, { useState, useEffect } from 'react'
import './style.css'
import { Link } from 'react-router-dom'
// import { Link, useHistory } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { userSignup, loginErrorRemove } from '../../actions/LoginSignupAction';
// import ErrorHandle from '../js/ErrorHandle';


const Signup = () => {
    // const history = useHistory()

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNo: "",
        password: "",
        cpassword: ""
    })

    // const dispatch = useDispatch()
    // const { authenticate, error } = useSelector((state) => state.user)

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUser({ ...user, [name]: value });
    }

    const handleForm = (e) => {
        e.preventDefault()
        // dispatch(userSignup(user))
    }

    // useEffect(() => {
    //     if (authenticate)
    //         history.goBack()
    // }, [authenticate])

    return (
        <div className="signup-main-page">
            {/* <Link to="/home"><h3><span style={{ color: "red" }}>FUZ</span>ICON</h3></Link> */}
            <form onSubmit={handleForm}>
                <div className="signup-form">
                    <h3>Create Your Account</h3>

                    <h4>First Name</h4>
                    <input type="text" name="firstName" className="signup-input"
                        onChange={handleInput} required />
                    <h4>Last Name</h4>
                    <input type="text" name="lastName" className="signup-input"
                        onChange={handleInput} required />

                    <h4>Email Address</h4>
                    <input type="email" name="email" className="signup-input"
                        onChange={handleInput} required />

                    <h4>Phone</h4>
                    <input type="text" name="phoneNo" className="signup-input"
                        onChange={handleInput} required />

                    {/* <div className="signup-password-box">
                        <div className="signup-password"> */}

                    <div className="signup-password-one">
                        <h4>Password</h4>
                        <input type="password" name="password" onChange={handleInput} required />
                    </div>

                    <div className="signup-password-one">
                        <h4>Confirm Password</h4>
                        <input type="password" name="cpassword" onChange={handleInput} required />
                    </div>

                    {/* </div>
                    </div>  */}
                    <div>
                        <input type="checkbox" required className="checkbox" /><span className="signup-terms-box">I agree to the Terms and condition</span>
                    </div>
                    <button className="signup-button">Sign Up</button>
                    <h5>Already have account <Link to="/login"><span style={{ color: "#478ccd" }}>Click here</span></Link></h5>
                </div>
            </form>

            {/* calling ErrorHandle() function component to show alert */}
            {
                // <ErrorHandle error={error} removeAction={loginErrorRemove} />
            }

        </div>
    )
}

export default Signup
