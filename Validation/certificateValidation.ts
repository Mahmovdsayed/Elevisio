import { allowedImageTypes } from "@/static/constant";
import * as yup from "yup";

const certificateValidationSchema = yup.object({
  title: yup
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(200, "Title must be at most 200 characters")
    .required("Title is required"),

  date: yup.string().trim().required("Date is required"),
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
    .required("certificate URL is required"),
  certificateImage: yup
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
    .required("certificate Image is required"),
});

const updateCertificateValidationSchema = yup.object({
  title: yup
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(200, "Title must be at most 200 characters")
    .required("Title is required"),
  date: yup.string().trim().required("Date is required"),
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
    .required("certificate URL is required"),
});
export { certificateValidationSchema, updateCertificateValidationSchema };
