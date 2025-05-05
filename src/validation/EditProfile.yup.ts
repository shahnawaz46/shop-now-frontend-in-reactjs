import * as Yup from 'yup'

  
export const editProfileSchema = Yup.object({
    firstName: Yup.string().transform((value)=> value.trim().replace(/\s+/g, ' ')).required("First Name is required"),
    lastName:Yup.string().transform((value)=> value.trim().replace(/\s+/g, ' ')).required("Last Name is required"),
    location: Yup.string().transform((value)=> value.trim().replace(/\s+/g, ' ')).required("Location is required")
})