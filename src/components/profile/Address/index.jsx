import React, { useState } from 'react';
import { FaRegAddressBook } from 'react-icons/fa';
// import { useSelector, useDispatch } from 'react-redux';

// components
import './style.css';
// import AddressForm from '../AddressForm';

// actions
// import { removeAddress } from '../../../../actions/AddressAction'


const Address = () => {
    const [showAddress, setShowAddress] = useState(false)
    const [userAddress, setUserAddress] = useState({})
    // const { address } = useSelector((state) => state.address)

    // const dispatch = useDispatch()

    // const removeAddressFnc = (addressId) => {
    //     dispatch(removeAddress(addressId))
    // }

    return (
        <div className="address-main-box">
            {
                [].length > 0 ?
                    <div className="address-not-available">
                        <FaRegAddressBook className="address-icon" />
                        <div className="address-not-available-content">
                            <h3>You haven't Added any Addresses</h3>
                            <button onClick={() => setShowAddress(true)} className="address-add-button-1">Add Address</button>
                        </div>
                    </div>
                    :
                    <div className="address-available-box">
                        <div className="address-add-button-box">
                            <h3>Saved Addresses</h3>
                            <button onClick={() => setShowAddress(true)} className="address-add-button-2">Add Address</button>
                        </div>
                        <div className="address-available">
                            {
                                // address?.map((value, index) =>
                                //     <div key={index} className="address-data-show">
                                //         <span className="address-person-name">{value.name}</span>
                                //         <span className="address-detail">{value.address}</span>
                                //         <span className="address-detail">{value.state} - {value.pinCode}</span>
                                //         <span className="address-detail">{value.city_DistrictTown}</span>
                                //         <span className="address-detail">Landmark : {value.landmark}</span>
                                //         <span className="address-person-mobile-no">Phone no : {value.mobileNumber}</span>
                                //         <div className="address-edit-remove-button">
                                //             <button style={{ marginRight: '5px' }} onClick={() => {
                                //                 setUserAddress(value)
                                //                 setShowAddress(true)
                                //             }}>Edit</button>
                                //             <button style={{ marginLeft: '5px' }} onClick={() => removeAddressFnc(value._id)}>Remove</button>
                                //         </div>
                                //     </div>
                                // )
                            }
                        </div>
                    </div>
            }
            {
                // showAddress && <AddressForm showAddress={showAddress} setShowAddress={setShowAddress} userAddress={userAddress} setUserAddress={setUserAddress} />
            }
        </div>
    )
}

export default Address
