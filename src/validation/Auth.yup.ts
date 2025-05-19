import * as Yup from "yup";
import { ILoginState, ISignUpState } from "../types/interfaces/auth";
import dayjs from "dayjs";
import { numberRegex, passwordRegex, unicodeNameRegex } from "../utils/Regex";
import {
  maxEmailSize,
  maxNameSize,
  maxNumberSize,
  maxPasswordSize,
} from "../utils/Constants";

export const singinInitialState: ILoginState = {
  email: "",
  password: "",
};

export const signInSchema = Yup.object({
  email: Yup.string()
    .required("Email is required")
    .email("Please enter a valid email address"),
  password: Yup.string().required("Password is required"),
});

export const signupInitialState: ISignUpState = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNo: null,
  dob: "",
  password: "",
  confirm_password: "",
  checked: false,
};

export const signUpSchema = Yup.object({
  firstName: Yup.string()
    .required("First Name is required")
    .max(maxNameSize, `First Name must be at most ${maxNameSize} characters`)
    .matches(
      unicodeNameRegex,
      "First name can only contain letters, spaces, hyphens, and apostrophes"
    ),

  lastName: Yup.string()
    .required("Last Name is required")
    .max(maxNameSize, `Last Name must be at most ${maxNameSize} characters`)
    .matches(
      unicodeNameRegex,
      "First name can only contain letters, spaces, hyphens, and apostrophes"
    ),

  email: Yup.string()
    .required("Email is required")
    .email("Please enter a valid email address")
    .max(maxEmailSize, `Email must be at most ${maxEmailSize} characters`),

  phoneNo: Yup.string()
    .required("Phone number is required")
    .matches(numberRegex, "Phone number must only contain digits")
    .min(maxNumberSize, `Phone number must be ${maxNumberSize} digit`)
    .max(maxNumberSize, `Phone number must be ${maxNumberSize} digit`),

  dob: Yup.string()
    .required("Date of birth is required")
    .test(
      "age",
      "You must be at least 10 years old to create an account",
      function (value) {
        const dob = dayjs(value);
        const age = dayjs().diff(dob, "years");
        // console.log(value, dob, age, age > 10);
        return age > 10;
      }
    ),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(
      maxPasswordSize,
      `Password must be at most ${maxPasswordSize} characters`
    )
    .matches(
      passwordRegex,
      "Password must contain at least one lowercase letter, one uppercase letter, one number and one special character"
    ),
  confirm_password: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password")], "Passwords do not match"),
  checked: Yup.boolean().oneOf(
    [true],
    "You must accept the terms and conditions"
  ),
});
