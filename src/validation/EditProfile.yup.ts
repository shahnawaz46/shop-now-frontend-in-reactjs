import * as Yup from "yup";
import { locationRegex, unicodeNameRegex } from "../utils/Regex";
import { maxAddressSize, maxNameSize } from "../utils/Constants";

export const editProfileSchema = Yup.object({
  firstName: Yup.string()
    .transform((value) => value?.trim().replace(/\s+/g, " ") || "")
    .required("First name is required")
    .max(maxNameSize, `First name must be at most ${maxNameSize} characters`)
    .matches(
      unicodeNameRegex,
      "First name can only contain letters, spaces, hyphens, and apostrophes"
    ),

  lastName: Yup.string()
    .transform((value) => value?.trim().replace(/\s+/g, " ") || "")
    .required("Last name is required")
    .max(maxNameSize, `Last name must be at most ${maxNameSize} characters`)
    .matches(
      unicodeNameRegex,
      "Last name can only contain letters, spaces, hyphens, and apostrophes"
    ),

  location: Yup.string()
    .transform((value) => value?.trim().replace(/\s+/g, " ") || "")
    .required("Location is required")
    .max(
      maxAddressSize,
      `Location must be at most ${maxAddressSize} characters`
    )
    .matches(locationRegex, "Location contains invalid characters"),
});
