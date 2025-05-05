import * as Yup from 'yup';
import { ILoginState } from '../types/interfaces/auth';

export const initialState: ILoginState = {
  email: '',
  password: '',
};

export const signInSchema = Yup.object({
  email: Yup.string()
    .required('Email is required')
    .email('Please enter a valid email address'),
  password: Yup.string().required('Password is required'),
});
