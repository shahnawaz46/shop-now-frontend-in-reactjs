import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';

// components
import './style.css';

// actions
// import { editUserProfileDetail } from '../../../../actions/LoginSignupAction';

const EditProfile = () => {
    // const { userDetail } = useSelector((state) => state.user)
    // const dispatch = useDispatch()
    // const [editUserDetail, setEditUserDetail] = useState(userDetail)

    const EditFormhandle = (e) => {
        e.preventDefault()
        // dispatch(editUserProfileDetail(editUserDetail))
    }

    const changeMobileNo = (e) => {
        e.preventDefault()
        // console.log("done")
    }

    return (
        <div className="editprofile-main-box">
            <h2>Edit Details</h2>
            <form className="editprofile-edit-form" onSubmit={EditFormhandle}>
                <div className="editprofile-edit-input">
                    <span>First Name</span>
                    {/* <input type="text" value={editUserDetail.firstName} required onChange={(e) => setEditUserDetail({ ...userDetail, firstName: e.target.value })} /> */}
               
                    <input type="text" value={"Mohammad"} required onChange={(e) => setEditUserDetail({ ...userDetail, firstName: e.target.value })} />
                </div>

                <div className="editprofile-edit-input">
                    <span>Last Name</span>
                    {/* <input type="text" value={editUserDetail.lastName} required onChange={(e) => setEditUserDetail({ ...userDetail, lastName: e.target.value })} /> */}
                    <input type="text" value={"Shahnawaz"} required onChange={(e) => setEditUserDetail({ ...userDetail, lastName: e.target.value })} />
                </div>

                <div className="editprofile-edit-input">
                    <span>Phone No</span>
                    {/* <input type="number" value={editUserDetail.phoneNo} required readOnly onChange={(e) => setEditUserDetail({ ...userDetail, phoneNo: e.target.value })} /> */}
                    <input type="number" value={"9977884455"} required readOnly onChange={(e) => setEditUserDetail({ ...userDetail, phoneNo: e.target.value })} />
                    <button className="editprofile-edit-phone-no-button" onClick={changeMobileNo}>Change</button>
                </div>

                <div className="editprofile-edit-input">
                    <span>Email</span>
                    {/* <input type="email" value={editUserDetail.email} required onChange={(e) => setEditUserDetail({ ...userDetail, email: e.target.value })} /> */}
                    <input type="email" value={"shahnawaz@gmail.com"} required onChange={(e) => setEditUserDetail({ ...userDetail, email: e.target.value })} />
                </div>

                <div className="editprofile-edit-input">
                    <span>Location</span>
                    {/* <input type="text" value={editUserDetail?.location || "Location"} required onChange={(e) => setEditUserDetail({ ...userDetail, location: e.target.value })} /> */}
                    <input type="text" value={"Location"} required onChange={(e) => setEditUserDetail({ ...userDetail, location: e.target.value })} />
                </div>

                <button className="editprofile-edit-form-button">Save Changes</button>
            </form>
        </div>
    )
}

export default EditProfile
