/* This TypeScript code snippet is defining a validation schema using the Yup library for a sign-up
form. The schema includes validation rules for various fields such as username, email, password,
first name, and last name. */
import * as yup from "yup";

export const signUpValidationSchema = yup.object({
  userName: yup
    .string()
    .trim()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters")
    .matches(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    )
    .required("Username is required"),

  email: yup
    .string()
    .trim()
    .email("Invalid email format")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format")
    .required("Email is required"),

  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(30, "Password must be at most 30 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    )
    .required("Password is required"),

  firstName: yup
    .string()
    .trim()
    .min(3, "First name must be at least 3 characters")
    .max(20, "First name must be at most 20 characters")
    .matches(/^[A-Za-z]+$/, "First name can only contain letters")
    .transform((value) => value.charAt(0).toUpperCase() + value.slice(1))
    .required("First name is required"),

  lastName: yup
    .string()
    .trim()
    .min(3, "Last name must be at least 3 characters")
    .max(20, "Last name must be at most 20 characters")
    .matches(/^[A-Za-z]+$/, "Last name can only contain letters")
    .transform((value) => value.charAt(0).toUpperCase() + value.slice(1))
    .required("Last name is required"),

  // image: yup
  //   .mixed()
  //   .test("fileType", "Only PNG, JPEG, and JPG files are allowed", (value) => {
  //     if (!value) return true;
  //     return value instanceof File && allowedImageTypes.includes(value.type);
  //   })
  //   .test("fileSize", "Image size should be less than 5MB", (value) => {
  //     if (!value) return true;
  //     return value instanceof File && value.size <= 5 * 1024 * 1024;
  //   })
  //   .optional(),

 
});
