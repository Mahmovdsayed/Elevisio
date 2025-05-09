import * as yup from "yup";

export const BlogUpdateValidationSchema = yup.object({
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
  status: yup
    .string()
    .oneOf(["draft", "published"])
    .required("Status is required")
    .default("published"),
});
