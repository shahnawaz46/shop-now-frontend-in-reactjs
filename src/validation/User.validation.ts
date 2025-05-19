import { IAddressDetails } from "../types/interfaces/user.interface";
import { locationRegex, numberRegex, unicodeNameRegex } from "../utils/Regex";
import { maxAddressSize, maxNameSize, maxNumberSize } from "../utils/Constants";

interface IValidationEror {
  [key: string]: string;
}

export const validateAddress = (values: IAddressDetails) => {
  const error: IValidationEror = {};

  if (!values.name) {
    error.name = "Full name is required";
  }
  if (values.name) {
    if (!unicodeNameRegex.test(values.name)) {
      error.name =
        "Full name can only contain letters, spaces, hyphens, and apostrophes";
    } else if (values.name.length > maxNameSize) {
      error.name = `Full name must be at most ${maxNameSize} characters`;
    }
  }

  if (!values.mobileNumber) {
    error.mobileNumber = "Mobile number is required";
  }
  if (values.mobileNumber) {
    if (!numberRegex.test(values.mobileNumber.toString())) {
      error.mobileNumber = "Phone number must only contain digits";
    } else if (values.mobileNumber.toString().length !== maxNumberSize) {
      error.mobileNumber = `Phone number must be ${maxNumberSize} digit`;
    }
  }

  if (!values.pinCode) {
    error.pinCode = "Pincode is required";
  }
  if (values.pinCode) {
    if (!numberRegex.test(values.pinCode.toString())) {
      error.pinCode = "Pincode must only contain digits";
    } else if (values.pinCode.toString().length !== 6) {
      error.pinCode = "Invalid Pincode";
    }
  }

  if (!values.state) {
    error.state = "State is required";
  }

  if (!values.address) {
    error.address = "Full Address is requierd";
  }
  if (values.address) {
    if (!locationRegex.test(values.address)) {
      error.address = "Address contains invalid characters";
    } else if (values.address.length > maxAddressSize) {
      error.address = `Address must be at most ${maxAddressSize} characters`;
    }
  }

  if (!values.locality) {
    error.locality = "Locality is requierd";
  }

  if (!values.cityDistrictTown) {
    error.cityDistrictTown = "City/District is required";
  }

  if (values.landmark) {
    if (!locationRegex.test(values.landmark)) {
      error.landmark = "Landmark contains invalid characters";
    } else if (values.landmark.length > maxAddressSize) {
      error.landmark = `Landmark must be at most ${maxAddressSize} characters`;
    }
  }

  if (values.alternatePhone) {
    if (!numberRegex.test(values.alternatePhone.toString())) {
      error.alternatePhone = "Alternate Phone number must only contain digits";
    } else if (values.alternatePhone.toString().length !== maxNumberSize) {
      error.alternatePhone = `Alternate Phone number must be ${maxNumberSize} digit`;
    }
  }

  if (!values.addressType) {
    error.addressType = "Address Type is required";
  }

  // console.log("Values: ", values);
  return error;
};
