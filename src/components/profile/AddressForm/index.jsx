import React, { useState, useEffect } from 'react'
// import { useSelector,useDispatch } from 'react-redux'
import axios from 'axios';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { useDispatch } from 'react-redux';

// components
import '../css/AddressForm.css'

// actions
import { addAddress } from '../../../../actions/AddressAction';

const AddressForm = ({ showAddress, setShowAddress, userAddress, setUserAddress }) => {

    const [invalidPinCodeMessage, setInvalidPinCodeMessage] = useState(null)
    const [locality, setLocality] = useState([])
    const [showLocalityList, setShowLocalityList] = useState(false)

    const dispatch = useDispatch()

    const handleInput = async (e) => {
        const name = e.target.name;
        const value = e.target.value;
        if (name === "pinCode") {
            setUserAddress({ ...userAddress, [name]: value })
            if (value.length == 6) {
                const res = await axios.get(`https://api.postalpincode.in/pincode/${value}`)
                if (res.data[0].Status === "Error") {
                    setInvalidPinCodeMessage("Invalid Pin Code")
                    setLocality([])
                } else {
                    const postOffice = res.data[0].PostOffice[0]
                    setUserAddress({ ...userAddress, [name]: value, state: postOffice.State, city_DistrictTown: postOffice.District });
                    setLocality(res.data[0].PostOffice.map((value) => value.Name))
                    setInvalidPinCodeMessage(null)
                }
            }

        } else {
            setUserAddress({ ...userAddress, [name]: value });
        }
    }

    const handleForm = (e) => {
        e.preventDefault()
        dispatch(addAddress(userAddress))
        setShowAddress(false)
        setUserAddress({})
    }

    useEffect(() => {
        if (showAddress) {
            document.body.style.overflow = 'hidden';
            if (window.innerWidth > 769) {
                document.body.style.paddingRight = '16px';
            }
        }
        return () => {
            document.body.style.overflow = 'unset';
            document.body.style.paddingRight = '0px';
        }
    }, [showAddress])

    return (
        <div className="address-form-main-box">
            <form onSubmit={handleForm} className="address-form">
                <div className="address-form-delivery-tag">
                    <h2>Add New Address</h2>
                </div>
                <div className="address-form-box-part-II">
                    <div className="address-form-input-filed-box">
                        <div style={{ marginRight: '5px', width: '100%' }}>
                            <h4 className="address-form-input-field-name">Name</h4>
                            <input type="text" value={userAddress.name || ''} name="name" className="address-form-input" onChange={handleInput} required />
                        </div>

                        <div style={{ width: '100%' }}>
                            <h4 className="address-form-input-field-name">Mobile Number</h4>
                            <input type="text" value={userAddress.mobileNumber || ''} name="mobileNumber" className="address-form-input" onChange={handleInput} required />
                        </div>
                    </div>

                    <div className="address-form-input-filed-box">
                        <div style={{ marginRight: '5px', width: '100%' }}>
                            <h4 className="address-form-input-field-name">Pincode</h4>
                            <input type="text" value={userAddress.pinCode || ''} name="pinCode" maxLength="6" className="address-form-input" onChange={handleInput} required />
                            {
                                invalidPinCodeMessage && <span style={{ fontSize: '14px', color: 'red' }}>*{invalidPinCodeMessage}</span>
                            }
                        </div>

                        <div style={{ width: '100%' }}>
                            <h4 className="address-form-input-field-name">State</h4>
                            <input type="text" value={userAddress.state || ''} readOnly className="address-form-input" required />
                        </div>

                    </div>

                    <div style={{ width: '100%' }}>
                        <h4 className="address-form-input-field-name">Address</h4>
                        <input type="text" value={userAddress.address || ''} name="address" placeholder="House no. 101 Block no 32" className="address-form-input" onChange={handleInput} required />
                    </div>

                    <div className="address-form-input-filed-box">
                        <div style={{ marginRight: '5px', width: '100%', position: 'relative' }}>
                            <h4 className="address-form-input-field-name">Locality</h4>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <input type="text" name="locality" value={userAddress.locality || ''} className="address-form-input" onChange={(e) => setUserAddress({ ...userAddress, locality: e.target.value })} required />
                                {
                                    showLocalityList ?
                                        <MdKeyboardArrowUp onClick={() => setShowLocalityList(false)} style={{ marginLeft: '-18px' }} />
                                        :
                                        <MdKeyboardArrowDown onClick={() => setShowLocalityList(true)} style={{ marginLeft: '-18px' }} />
                                }
                            </div>
                            {
                                showLocalityList &&
                                <div className="address-form-show-locality-box">
                                    {/* <ul> */}
                                    {
                                        locality.length > 0 && locality.map((value, index) => {
                                            return (
                                                <span key={index} className="address-form-show-locality" onClick={() => {
                                                    setUserAddress({ ...userAddress, locality: value })
                                                    setShowLocalityList(false)
                                                }}>{value}</span>
                                            )
                                        })
                                    }
                                    {/* </ul> */}
                                </div>}
                        </div>

                        <div style={{ width: '100%' }}>
                            <h4 className="address-form-input-field-name">City/District Town</h4>
                            <input type="text" value={userAddress.city_DistrictTown || ''} readOnly className="address-form-input" required />
                        </div>
                    </div>

                    <div>
                        <h4 className="address-form-input-field-name">landmark <span style={{ fontSize: '15px' }}>(optional)</span></h4>
                        <input type="text" value={userAddress.landmark || ''} name="landmark" placeholder="Near Apolo Hospital" className="address-form-input" onChange={handleInput} />

                        <h4 className="address-form-input-field-name">Alternate Phone Number <span style={{ fontSize: '15px' }}>(optional)</span></h4>
                        <input type="text" value={userAddress.alternatePhone || ''} name="alternatePhone" className="address-form-input" onChange={handleInput} />
                    </div>
                </div>
                <h4 className="address-form-input-field-name">Addres Type</h4>
                <div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <input style={{ marginRight: "2px" }} type="radio" checked={userAddress.addressType == "Home" && true} name="addressType" onClick={(e) => setUserAddress({ ...userAddress, [e.target.name]: "Home" })} />
                        <span>Home</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <input style={{ marginRight: "2px" }} type="radio" checked={userAddress.addressType == "Work" && true} name="addressType" onClick={(e) => setUserAddress({ ...userAddress, [e.target.name]: "Work" })} />
                        <span>Work</span>
                    </div>
                </div>
                <div className="address-form-buttons">
                    <button className="address-form-buttton" id={invalidPinCodeMessage && "disable-add-address-button"} disabled={invalidPinCodeMessage}>Add Address</button>
                    <button className="address-form-buttton" onClick={() => {
                        setUserAddress({})
                        setShowAddress(false)
                    }}>Cancel</button>
                </div>
            </form >
        </div >
    )
}

export default AddressForm