import { allowedImageTypes } from "@/static/constant";
import * as yup from "yup";

const addProjectValidationSchema = yup.object({
  name: yup
    .string()
    .min(3, "Project Name must be at least 3 characters")
    .max(200, "Project Name must be at most 200 characters")
    .trim()
    .required("Project name is required"),
  description: yup
    .string()
    .min(3, "Project description must be at least 3 characters")
    .required("Project description is required"),
  projectImage: yup
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
  clientName: yup.string().trim().optional(),
  from: yup.string().required("Start date is required"),
  to: yup.string().optional(),
  projectType: yup
    .string()
    .required("Project type is required")
    .oneOf(
      ["Tech", "Design", "Marketing", "Business", "Creative", "Other"],
      "Invalid project type"
    ),
  techStack: yup.array().of(yup.string()).optional(),
  designTools: yup.array().of(yup.string()).optional(),

  projectURL: yup.string().url("Invalid project URL").optional(),
  githubURL: yup.string().url("Invalid GitHub URL").optional(),
  designFileURL: yup.string().url("Invalid design file URL").optional(),
  status: yup
    .string()
    .oneOf(
      ["Planned", "In-Progress", "Completed", "On-Hold"],
      "Invalid project status"
    )
    .optional()
    .default("Completed"),
});

export { addProjectValidationSchema };
