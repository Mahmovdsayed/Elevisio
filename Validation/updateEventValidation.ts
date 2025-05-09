import * as yup from "yup";

export const EventUpdateValidationSchema = yup.object({
  name: yup
    .string()
    .required("Event name is required")
    .max(120, "Event name too long")
    .trim(),
  description: yup
    .string()
    .required("Description is required")
    .min(50, "Description too short")
    .trim(),
  shortDescription: yup.string().max(200, "Short description too long").trim(),
  status: yup
    .string()
    .oneOf(["draft", "published", "cancelled", "postponed"], "Invalid status")
    .default("draft"),
  category: yup
    .string()
    .oneOf(
      [
        "conference",
        "workshop",
        "concert",
        "exhibition",
        "networking",
        "sports",
        "other",
      ],
      "Invalid category"
    )
    .default("other"),
  currency: yup.string().length(3, "Currency must be 3 characters").uppercase(),
  ageRestriction: yup
    .string()
    .oneOf(["all", "18+", "21+"], "Invalid age restriction")
    .default("all"),
});
