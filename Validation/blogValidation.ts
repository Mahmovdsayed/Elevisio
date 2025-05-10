import { allowedImageTypes } from "@/static/constant";
import * as yup from "yup";

export const BlogValidationSchema = yup.object({
  title: yup
    .string()
    .min(3, "Blog Title must be at least 3 characters")
    .max(200, "Blog Title must be at most 200 characters")
    .trim()
    .required("Blog Title is required"),
  content: yup
    .string()
    .min(50, "Content must be at least 50 characters")
    .trim()
    .required("Content is required"),
  category: yup.string().required("Category is required"),
  seoKeywords: yup
    .array()
    .of(yup.string())
    .min(1, "Keywords are required")
    .required("Keywords are required"),
  blogImage: yup
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
    .required("Blog Image is required"),
  // .nullable(),
  status: yup.string().oneOf(["draft", "published"]).default("published"),
});
