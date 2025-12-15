export interface IDeviceInfo {
  device?: string;
  browser?: string;
}

export interface ILoginState {
  email: string;
  password: string;
}

export interface ISignUpState {
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: number | null;
  dob: string;
  password: string;
  confirm_password: string;
  checked: boolean;
}
