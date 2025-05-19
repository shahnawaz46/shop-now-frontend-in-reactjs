export interface IPersonalDetail {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: number | null;
  profilePicture: string;
  location: string;
}

export interface IAddressDetails {
  _id?: string;
  name: string;
  mobileNumber: number | null;
  pinCode: number | null;
  state: string;
  address: string;
  locality: string;
  cityDistrictTown: string;
  landmark?: string;
  alternatePhone?: number | null;
  addressType: string;
}

export interface IOpenAddressModal {
  type: "Add Address" | "Update Address" | "";
  show: boolean;
}
