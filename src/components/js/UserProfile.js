import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, NavLink, useParams } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import { BsFillCameraFill } from 'react-icons/bs';
import CircularProgress from '@mui/material/CircularProgress';

// components
import '../css/UserProfile.css'
import Navbar from './Navbar'
import Footer from './Footer'
import Address from './user_profile/js/Address';
import EditProfile from './user_profile/js/EditProfile';
import PlaceOrders from './user_profile/js/PlaceOrders';
import Exchange from './user_profile/js/Exchange';
import Return from './user_profile/js/Return';
import { giveMeProfileImage } from '../../axios/UlrConfig';
import ErrorHandle from './ErrorHandle';


// action
import { userLogout, getUserProfile, updateProfilePic, loginErrorRemove } from '../../actions/LoginSignupAction';
import { getAddress, removeAddressMessageAndError } from '../../actions/AddressAction';


const UserProfile = () => {
    const { page } = useParams()
    const { userDetail, authenticate, loading, updatedMessage, error } = useSelector((state) => state.user)
    const { addressMessage, addressError } = useSelector((state) => state.address)
    const dispatch = useDispatch()
    const history = useHistory()

    const [userProfilePic, setUserProfilePic] = useState(null)

    const userLogoutFnc = () => {
        dispatch(userLogout())
    }

    const updateProfileFnc = (e) => {
        const form = new FormData()
        form.append("profilePicture", e.target.files[0])

        dispatch(updateProfilePic(form))
        setUserProfilePic(null)
    }

    useEffect(() => {
        if (authenticate) {
            dispatch(getUserProfile())
            dispatch(getAddress())
        }
        if (!localStorage.getItem("__xyz__"))
            history.push('/home')
    }, [authenticate])

    useEffect(() => {
        if (updatedMessage) {
            console.log("updatedMessage")
            dispatch(getUserProfile())
        }
        if (addressMessage) {
            console.log("addressMessage")
            dispatch(getAddress())
        }
    }, [updatedMessage, addressMessage])

    return (
        <div>
            <Navbar />
            {
                loading ?
                    <div className="men-loader">
                        <CircularProgress />
                    </div>
                    :
                    <>
                        <div className="profile-main-box">
                            <h2 style={{ textAlign: "center", fontWeight: "400", paddingTop: '15px' }}>Customer Dashboard</h2>
                            <div className="profile-detail-main-box">
                                <div className="profile-picture-box">
                                    <Avatar alt="Remy Sharp" src={userDetail.profilePicture && giveMeProfileImage(userDetail.profilePicture)} style={{ width: "100%", height: "100%", objectFit: 'contain' }} />
                                    <BsFillCameraFill className="profile-edit-icon" />
                                    <input type="file" accept=".png, .jpg, .jpeg" className="profile-select-input" onChange={updateProfileFnc} />

                                </div>
                                <div className="profile-detail-box">
                                    <h2 className="profile-name-box">{userDetail?.firstName}</h2>
                                    <div className="profile-details">First Name - {userDetail?.firstName}</div>
                                    <div className="profile-details">Last Name - {userDetail?.lastName}</div>
                                    <div className="profile-details">Email - {userDetail?.email}</div>
                                    <div className="profile-details">Mobile No. - {userDetail?.phoneNo}</div>
                                    <button onClick={userLogoutFnc} className="profile-user-button">Logout</button>
                                </div>
                            </div>
                            <div className="profile-main-features-box">
                                <ul className="profile-main-features-ul">
                                    <NavLink to="address" activeClassName="profile-apply-background-color"><li>User Address Detail</li></NavLink>
                                    <NavLink to="edit-profile" activeClassName="profile-apply-background-color"><li>Edit Profile</li></NavLink>
                                    <NavLink to="place-orders" activeClassName="profile-apply-background-color"><li>Place Order</li></NavLink>
                                    <NavLink to="exchange" activeClassName="profile-apply-background-color"><li>Exchange</li></NavLink>
                                    <NavLink to="return" activeClassName="profile-apply-background-color"><li>Return</li></NavLink>
                                </ul>
                            </div>
                            <div className="profile-features-box">
                                {
                                    page === "address" && <Address />
                                }

                                {
                                    page === "edit-profile" && <EditProfile />
                                }

                                {
                                    page === "place-orders" && <PlaceOrders />
                                }

                                {
                                    page === "exchange" && <Exchange />
                                }

                                {
                                    page === "return" && <Return />
                                }
                            </div>
                            {/* for show error and messages */}
                            {
                                (updatedMessage || error) && <ErrorHandle message={updatedMessage} error={error} removeAction={loginErrorRemove} />
                            }

                            {/* for show error and messages */}
                            {
                                (addressMessage || addressError) && <ErrorHandle message={addressMessage} error={addressError} removeAction={removeAddressMessageAndError} />
                            }
                        </div>
                        <Footer />
                    </>
            }
        </div >
    )
}
export default UserProfile