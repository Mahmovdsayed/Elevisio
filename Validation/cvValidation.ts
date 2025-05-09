import * as yup from "yup";

const allowedPdfTypes = ["application/pdf"];

export const cvValidationSchema = yup.object({
  name: yup
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),
  isMainCV: yup.boolean().required().default(false),
  CV: yup
    .mixed()
    .transform((value) => (value === null ? null : value))
    .test("fileType", "Only PDF files are allowed", (value) => {
      if (!value) return true;
      return value instanceof File && allowedPdfTypes.includes(value.type);
    })
    .test("fileSize", "File size should be less than 5MB", (value) => {
      if (!value) return true;
      return value instanceof File && value.size <= 5 * 1024 * 1024;
    })
    .nullable(),
});
