import dayjs from 'dayjs';
import * as Yup from 'yup';

export const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNo: '',
  dob: '',
  password: '',
  confirm_password: '',
  checked: false,
};

export const signUpSchema = Yup.object({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  email: Yup.string()
    .required('Email is required')
    .email('Please enter a valid email address'),
  phoneNo: Yup.string()
    .required('Phone number is required')
    .matches(/^[0-9]+$/, 'Phone number must only contain digits')
    .min(10, 'Phone number must be 10 digit')
    .max(10, 'Phone number must be 10 digit'),
  dob: Yup.string()
    .required('Date of birth is required')
    .test(
      'age',
      'You must be at least 10 years old to create an account',
      function (value) {
        const dob = dayjs(value);
        const age = dayjs().diff(dob, 'years');
        // console.log(value, dob, age, age > 10);
        return age > 10;
      }
    ),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/,
      'Password must contain at least one lowercase letter, one uppercase letter, one number and one special character'
    ),
  confirm_password: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password')], 'Passwords do not match'),
  checked: Yup.boolean().oneOf(
    [true],
    'You must accept the terms and conditions'
  ),
});
