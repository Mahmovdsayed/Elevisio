import * as yup from "yup";
import { allowedImageTypes } from "@/static/constant";

export const shopSchema = yup.object({
  title: yup
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(200, "Title must be at most 200 characters")
    .required("Title is required"),
  description: yup
    .string()
    .trim()
    .min(3, "Description must be at least 3 characters")
    .max(500, "Description must be at most 50 characters")
    .required("Description is required"),
  price: yup
    .number()
    .typeError("Price must be number")
    .required("Price is required")
    .positive("Price must be greater than 0"),
  discountPrice: yup
    .number()
    .typeError("Discount Price must be a number")
    .nullable()
    .when("hasDiscount", {
      is: true,
      then: (schema) =>
        schema
          .required("Discount Price is required when discount is active")
          .positive("Discount Price must be greater than 0")
          .max(
            yup.ref("price"),
            "Discount price must be less than the original price"
          ),
      otherwise: (schema) => schema.nullable(),
    }),
  hasDiscount: yup.boolean().default(false),
  purchaseLink: yup
    .string()
    .url("Purchase Link must be a vaild URL")
    .required("Purchase Link is required"),
  category: yup.string().required("Category is required"),
  productImage: yup
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
});
