/* This TypeScript code snippet is defining a schema using the Yup library for validating and
sanitizing user input data. Here's a breakdown of what the code is doing: */
import * as yup from "yup";

const today = new Date();
const minAge = 13;
const maxAge = 100;

export const updateUserInfoSchema = yup.object({
  firstName: yup
    .string()
    .trim()
    .min(3, "First name must be at least 3 characters")
    .max(20, "First name must be at most 20 characters")
    .matches(/^[A-Za-z]+$/, "First name can only contain letters")
    .transform((value) => value.charAt(0).toUpperCase() + value.slice(1)),

  lastName: yup
    .string()
    .trim()
    .min(3, "Last name must be at least 3 characters")
    .max(20, "Last name must be at most 20 characters")
    .matches(/^[A-Za-z]+$/, "Last name can only contain letters")
    .transform((value) => value.charAt(0).toUpperCase() + value.slice(1)),

  positionName: yup
    .string()
    .trim()
    .min(3, "Position name must be at least 3 characters")
    .max(50, "Position name cannot exceed 50 characters"),

  birthday: yup.string().trim(),

  phone: yup
    .string()
    .nullable()
    // .matches(/^\+?\d{5,15}$/, "Invalid phone number format")
    .optional(),

  website: yup.string().trim().url("Invalid website URL"),

  gender: yup.string().oneOf(["male", "female"], "Gender is required"),

  about: yup.string().trim().max(500, "About must be at most 500 characters"),

  country: yup
    .string()
    .trim()
    .min(2, "Country must be at least 2 characters")
    .max(50, "Country must be at most 50 characters"),
  nationality: yup
    .string()
    .trim()
    .min(2, "Nationality must be at least 2 characters")
    .max(50, "Nationality must be at most 50 characters"),
  city: yup
    .string()
    .trim()
    .min(2, "City must be at least 2 characters")
    .max(50, "City must be at most 50 characters")
    .matches(/^[A-Za-z\s]+$/, "City can only contain letters and spaces"),
});
