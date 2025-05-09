import * as yup from "yup";
import { allowedImageTypes } from "@/static/constant";

const addNewWorkSchema = yup.object({
  companyName: yup
    .string()
    .trim()
    .min(3, "Company name must be at least 3 characters")
    .max(50, "Company name must be at most 50 characters")
    .required("Company name is required"),

  positionName: yup
    .string()
    .trim()
    .min(3, "Position name must be at least 3 characters")
    .max(50, "Position name must be at most 50 characters")
    .required("Position name is required"),

  description: yup
    .string()
    .trim()
    .min(3, "Description must be at least 3 characters")
    .max(500, "Description must be at most 50 characters")
    .optional(),

  from: yup.string().trim().required("From is required"),

  to: yup.string().trim().nullable().optional(),

  companyImage: yup
    .mixed()
    .transform((value) => (value === null ? null : value))
    .test(
      "fileType",
      "Only PNG, JPEG, and JPG files or GIF files are allowed",
      (value) => {
        if (!value) return true;
        return value instanceof File && allowedImageTypes.includes(value.type);
      }
    )
    .test("fileSize", "File size should be less than 5MB", (value) => {
      if (!value) return true;
      return value instanceof File && value.size <= 5 * 1024 * 1024;
    })
    .nullable(),

  current: yup.boolean().optional(),

  employmentType: yup
    .string()
    .oneOf([
      "Full-time",
      "Part-time",
      "Contract",
      "Internship",
      "Freelance",
      "Remote",
      "Temporary",
      "Casual",
      "Volunteer",
      "Self-Employed",
      "Apprenticeship",
      "Other",
    ])
    .required("Employment type is required"),
});

const updateWorkSchema = yup.object({
  companyName: yup
    .string()
    .trim()
    .min(3, "Company name must be at least 3 characters")
    .max(50, "Company name must be at most 50 characters")
    .optional(),

  positionName: yup
    .string()
    .trim()
    .min(3, "Position name must be at least 3 characters")
    .max(50, "Position name must be at most 50 characters")
    .optional(),

  description: yup
    .string()
    .trim()
    .min(3, "Description must be at least 3 characters")
    .max(500, "Description must be at most 500 characters")
    .optional(),

  from: yup.string().trim().optional(),

  to: yup.string().trim().nullable().optional(),

  companyImage: yup
    .mixed()
    .nullable()
    .optional()
    .test(
      "fileType",
      "Only PNG, JPEG, and JPG files or GIF files are allowed",
      (value) => {
        if (!value || typeof value === "object") return true;
        return value instanceof File && allowedImageTypes.includes(value.type);
      }
    )
    .test("fileSize", "File size should be less than 5MB", (value) => {
      if (!value || typeof value === "object") return true;
      return value instanceof File && value.size <= 5 * 1024 * 1024;
    }),

  current: yup.boolean().optional(),

  employmentType: yup
    .string()
    .oneOf([
      "Full-time",
      "Part-time",
      "Contract",
      "Internship",
      "Freelance",
      "Remote",
      "Temporary",
      "Casual",
      "Volunteer",
      "Self-Employed",
      "Apprenticeship",
      "Other",
    ])
    .optional(),
});

const deleteSchema = yup.object({
  ID: yup.string().required("Work ID is required"),
});

export { addNewWorkSchema, updateWorkSchema, deleteSchema };
