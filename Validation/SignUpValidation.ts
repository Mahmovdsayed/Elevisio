import { allowedImageTypes } from "@/static/constant";
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

  firstName: yup
    .string()
    .trim()
    .min(3, "First name must be at least 3 characters")
    .max(20, "First name must be at most 20 characters")
    .matches(/^[A-Za-z]+$/, "First name can only contain letters")
    .transform((value) => value.charAt(0).toUpperCase() + value.slice(1))
    .required("First name is required"),

  secondName: yup
    .string()
    .trim()
    .min(3, "Last name must be at least 3 characters")
    .max(20, "Last name must be at most 20 characters")
    .matches(/^[A-Za-z]+$/, "Last name can only contain letters")
    .transform((value) => value.charAt(0).toUpperCase() + value.slice(1))
    .required("Last name is required"),

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

  image: yup
    .mixed()
    .test("fileType", "Only PNG, JPEG, and JPG files are allowed", (value) => {
      if (!value) return true;
      return value instanceof File && allowedImageTypes.includes(value.type);
    })
    .test("fileSize", "Image size should be less than 5MB", (value) => {
      if (!value) return true;
      return value instanceof File && value.size <= 5 * 1024 * 1024;
    })
    .optional(),

  // acceptTerms: yup
  //   .boolean()
  //   .oneOf([true], "You must accept the terms and conditions")
  //   .required("You must accept the terms and conditions"),

  // country: yup
  //   .string()
  //   .trim()
  //   .min(2, "Country must be at least 2 characters")
  //   .max(50, "Country must be at most 50 characters")
  //   .matches(/^[A-Za-z\s]+$/, "Country can only contain letters and spaces")
  //   .optional(),

  // nationality: yup
  //   .string()
  //   .trim()
  //   .min(2, "Nationality must be at least 2 characters")
  //   .max(50, "Nationality must be at most 50 characters")
  //   .matches(/^[A-Za-z\s]+$/, "Nationality can only contain letters and spaces")
  //   .optional(),

  // city: yup
  //   .string()
  //   .trim()
  //   .min(2, "City must be at least 2 characters")
  //   .max(50, "City must be at most 50 characters")
  //   .matches(/^[A-Za-z\s]+$/, "City can only contain letters and spaces")
  //   .optional(),

  // bio: yup
  //   .string()
  //   .trim()
  //   .max(200, "Bio must be at most 200 characters")
  //   .optional(),

  // about: yup
  //   .string()
  //   .trim()
  //   .max(500, "About must be at most 500 characters")
  //   .optional(),

  // positionName: yup
  //   .string()
  //   .trim()
  //   .min(3, "Position name must be at least 3 characters")
  //   .max(50, "Position name cannot exceed 50 characters")
  //   .optional(),

  // birthday: yup
  //   .date()
  //   .typeError("Invalid date format")
  //   .max(
  //     new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate()),
  //     `You must be at least ${minAge} years old`
  //   )
  //   .min(
  //     new Date(today.getFullYear() - maxAge, today.getMonth(), today.getDate()),
  //     `Age cannot exceed ${maxAge} years`
  //   )
  //   .required("Birthday is required"),

  // phone: yup
  //   .string()
  //   .trim()
  //   .matches(/^\+?\d{10,15}$/, "Invalid phone number format")
  //   .optional(),

  // website: yup.string().trim().url("Invalid website URL").optional(),

  // gender: yup
  //   .string()
  //   .oneOf(["Male", "Female"], "Gender is required")
  //   .required("Gender is required"),
});
