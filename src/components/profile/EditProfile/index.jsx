import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

// components
import "./style.css";
import { editPersonalDetails } from "../../../redux/slices/UserSlice";

const EditProfile = () => {
  const dispatch = useDispatch();
  const { personalDetails } = useSelector((state) => state.user);

  const [editUserDetail, setEditUserDetail] = useState(personalDetails);

  const EditFormhandle = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, location } = editUserDetail;
    console.log(firstName, lastName, email, location);
    if (!firstName) return toast.error("Please Enter First Name");
    else if (!lastName) return toast.error("Please Enter Last Name");
    else if (!email) return toast.error("Please Enter Email");
    else if (!location) return toast.error("Please Enter Location");

    console.log("all done")
    dispatch(editPersonalDetails({firstName, lastName, email, location}))
  };
  
  const changeMobileNo = (e) => {
    e.preventDefault();
    console.log("done");
  };

  return (
    <div className="editprofile-main-box">
      <h2>Edit Details</h2>
      <form className="editprofile-edit-form" onSubmit={EditFormhandle}>
        <div className="editprofile-edit-input">
          <span>First Name</span>
          <input
            type="text"
            value={editUserDetail.firstName}
            onChange={(e) =>
              setEditUserDetail({ ...editUserDetail, firstName: e.target.value })
            }
          />
        </div>

        <div className="editprofile-edit-input">
          <span>Last Name</span>
          <input
            type="text"
            value={editUserDetail.lastName}
            onChange={(e) =>
              setEditUserDetail({ ...editUserDetail, lastName: e.target.value })
            }
          />
        </div>

        <div className="editprofile-edit-input">
          <span>Phone No</span>
          <input
            type="number"
            value={editUserDetail.phoneNo}
            readOnly
            onChange={(e) =>
              setEditUserDetail({ ...editUserDetail, phoneNo: e.target.value })
            }
          />

          <button
            className="editprofile-edit-phone-no-button"
            onClick={changeMobileNo}
          >
            Change
          </button>
        </div>

        <div className="editprofile-edit-input">
          <span>Email</span>
          <input
            type="email"
            value={editUserDetail.email}
            onChange={(e) =>
              setEditUserDetail({ ...editUserDetail, email: e.target.value })
            }
          />
        </div>

        <div className="editprofile-edit-input">
          <span>Location</span>
          <input
            type="text"
            value={editUserDetail?.location || ""}
            onChange={(e) =>
              setEditUserDetail({ ...editUserDetail, location: e.target.value })
            }
          />
        </div>

        <button className="editprofile-edit-form-button">Save Changes</button>
      </form>
    </div>
  );
};

export default React.memo(EditProfile);
