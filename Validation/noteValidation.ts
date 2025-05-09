import * as yup from "yup";

export const noteValidationSchema = yup.object({
  title: yup
    .string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters"),
  content: yup
    .string()
    .required("Content is required")
    .min(3, "Content must be at least 3 characters"),
  type: yup
    .string()
    .required("Type is required")
    .oneOf(["note", "task", "todo"])
    .default("note"),
  isCompleted: yup.boolean().default(false),
  priority: yup.string().oneOf(["low", "medium", "high"]).default("low"),
});
