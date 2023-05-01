import React, { useState } from "react";
import { FaRegAddressBook } from "react-icons/fa";
import { useSelector } from 'react-redux';

// components
import "./style.css";
import AddressForm from '../AddressForm'

const Address = () => {
  const [showAddress, setShowAddress] = useState(false);
  const [userAddress, setUserAddress] = useState({});
  const { addressDetails } = useSelector((state) => state.user)

const address = [{
  "name": "shanu",
  "mobileNumber": "9966338855",
  "pinCode": "110006",
  "locality": "Chandni Chowk",
  "address": "house no 636 block no 102",
  "state": "Delhi",
  "addressType": "Home",
  "_id": "61c9d5500667ff86764f3d6f"
},
{
  "name": "somya ranjan",
  "mobileNumber": "8855441122",
  "pinCode": "110091",
  "locality": "Mayur Vihar Ph-I",
  "address": "Sashi garden gali no 12 house no 445",
  "state": "Delhi",
  "landmark": "near Jevan anmol hospital",
  "addressType": "Home",
  "_id": "61c9f2cabe79ede5afff37df"
}]



  // const removeAddressFnc = (addressId) => {
  //     dispatch(removeAddress(addressId))
  // }


  return (
    <div className="address-main-box">
      {addressDetails.length === 0 ? (
        <div className="address-not-available">
          <FaRegAddressBook className="address-icon" />
          <div className="address-not-available-content">
            <h3>You haven't Added any Addresses</h3>
            <button
              onClick={() => setShowAddress(true)}
              className="address-add-button-1"
            >
              Add Address
            </button>
          </div>
        </div>
      ) : (
        <div className="address-available-box">
          <div className="address-add-button-box">
            <h3>Saved Addresses</h3>
            <button
              onClick={() => setShowAddress(true)}
              className="address-add-button-2"
            >
              Add Address
            </button>
          </div>
          <div className="address-available">
            {addressDetails?.map((value, index) => (
              <div key={index} className="address-data-show">
                <span className="address-person-name">{value.name}</span>
                <span className="address-detail">{value.address}</span>
                <span className="address-detail">
                  {value.state} - {value.pinCode}
                </span>
                <span className="address-detail">
                  {value.city_DistrictTown}
                </span>
                <span className="address-detail">
                  Landmark : {value.landmark}
                </span>
                <span className="address-person-mobile-no">
                  Phone no : {value.mobileNumber}
                </span>
                <div className="address-edit-remove-button">
                  <button
                    style={{ marginRight: "5px" }}
                    onClick={() => {
                      setUserAddress(value);
                      setShowAddress(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    style={{ marginLeft: "5px" }}
                    // onClick={() => removeAddressFnc(value._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {
        showAddress && <AddressForm showAddress={showAddress} setShowAddress={setShowAddress} userAddress={userAddress} setUserAddress={setUserAddress} />
      }
    </div>
  );
};

export default React.memo(Address);
