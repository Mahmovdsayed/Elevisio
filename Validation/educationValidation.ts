import * as yup from "yup";
import { allowedImageTypes } from "@/static/constant";

export const educationSchema = yup.object({
  schoolName: yup
    .string()
    .trim()
    .min(3, "School Name must be at least 3 characters")
    .max(200, "School Name must be at most 200 characters")
    .required("School Name is required"),

  faculty: yup
    .string()
    .trim()
    .min(3, "Faculty must be at least 3 characters")
    .max(200, "Faculty must be at most 200 characters")
    .required("Faculty is required"),

  from: yup.string().trim().required("From date is required"),
  to: yup.string().trim().nullable().optional(),
  description: yup
    .string()
    .trim()
    .min(3, "Description must be at least 3 characters")
    .max(500, "Description must be at most 50 characters")
    .nullable()
    .optional(),
  status: yup
    .string()
    .oneOf(["Currently Studying", "Graduated"])
    .required("Status is required"),

  gpa: yup
    .number()
    .min(0, "GPA must be at least 0")
    .max(4, "GPA must be at most 4")
    .nullable()
    .optional(),

  location: yup
    .string()
    .trim()
    .max(200, "Location must be at most 200 characters")
    .nullable()
    .optional(),

  schoolImage: yup
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

  certificateURL: yup
    .string()
    .test(
      "is-google-drive",
      "Certificate URL must be a valid Google Drive link",
      (value) => {
        if (!value) return true;

        try {
          const url = new URL(value);
          return (
            url.hostname === "drive.google.com" ||
            url.hostname.endsWith(".drive.google.com")
          );
        } catch {
          return false;
        }
      }
    )
    .nullable()
    .optional(),
});
