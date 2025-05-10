import { allowedImageTypes } from "@/static/constant";
import * as yup from "yup";

export const TicketTierSchema = yup.object().shape({
  name: yup
    .string()
    .required("Ticket tier name is required")
    .max(50, "Ticket name too long"),
  price: yup
    .number()
    .required("Price is required")
    .min(0, "Price cannot be negative")
    .typeError("Price must be a number"),
});

export const EventValidationSchema = yup.object().shape({
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
  dateTime: yup.object().shape({
    start: yup.string().required("Start date is required"),
    end: yup.string().required("End date is required"),
  }),
  location: yup.object().shape({
    venue: yup.string().trim(),
    address: yup.string().when("onlineEvent", {
      is: false,
      then: (schema) =>
        schema.required("Address is required for physical events").trim(),
      otherwise: (schema) => schema.trim(),
    }),
    city: yup.string().when("onlineEvent", {
      is: false,
      then: (schema) =>
        schema.required("City is required for physical events").trim(),
      otherwise: (schema) => schema.trim(),
    }),
    country: yup.string().when("onlineEvent", {
      is: false,
      then: (schema) =>
        schema.required("Country is required for physical events").trim(),
      otherwise: (schema) => schema.trim(),
    }),
    onlineEvent: yup.boolean().default(false),
    meetingLink: yup.string().when("onlineEvent", {
      is: true,
      then: (schema) =>
        schema
          .required("Meeting link is required for online events")
          .url("Invalid URL format")
          .trim(),
      otherwise: (schema) => schema.trim(),
    }),
  }),

  eventBanner: yup
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
  ticketTypes: yup
    .array()
    .of(TicketTierSchema)
    .when("isFree", ([isFree], schema) =>
      isFree === false
        ? schema.min(1, "At least one ticket type is required for paid events")
        : schema
    ),
  isFree: yup.boolean().default(false),
  currency: yup.string().length(3, "Currency must be 3 characters").uppercase(),
  views: yup.number().min(0, "Views cannot be negative").integer().default(0),
  registration: yup.object().shape({
    externalLink: yup
      .string()
      .required("Registration link is required")
      .url("Invalid URL format")
      .trim(),
    status: yup
      .string()
      .oneOf(["open", "closed", "soldout"], "Invalid registration status")
      .default("open"),
    closeDate: yup.date().typeError("Invalid close date format"),
  }),
  organizer: yup.object().shape({
    name: yup.string().trim().required("Organizer name is required"),
    email: yup.string().email("Invalid email format").trim().lowercase(),
    phone: yup.string().trim(),
    website: yup.string().url("Invalid website URL").trim(),
    socialMedia: yup.object().shape({
      facebook: yup.string().url().trim(),
      instagram: yup.string().url().trim(),
    }),
    bio: yup.string().trim(),
    image: yup
      .mixed()
      .transform((value) => (value === null ? null : value))
      .test(
        "fileType",
        "Only PNG, JPEG, and JPG files or GIF files are allowed",
        (value) => {
          if (!value) return true;
          return (
            value instanceof File && allowedImageTypes.includes(value.type)
          );
        }
      )
      .test("fileSize", "File size should be less than 5MB", (value) => {
        if (!value) return true;
        return value instanceof File && value.size <= 5 * 1024 * 1024;
      })
      .nullable(),
  }),
  speakers: yup.array().of(
    yup.object().shape({
      name: yup.string().trim().required("Speaker name is required"),
      bio: yup.string().trim(),
     
      socialMedia: yup.object().shape({
        instagram: yup.string().url("Invalid Twitter URL").trim(),
        facebook: yup.string().url("Invalid LinkedIn URL").trim(),
      }),
    })
  ),
  sponsors: yup.array().of(
    yup.object().shape({
      name: yup.string().trim().required("Sponsor name is required"),
      tier: yup
        .string()
        .oneOf(["platinum", "gold", "silver", "bronze"], "Invalid sponsor tier")
        .default("silver"),
      website: yup.string().url("Invalid website URL").trim(),
    })
  ),

  faqs: yup.array().of(
    yup.object().shape({
      question: yup.string().trim().required("Question is required"),
      answer: yup.string().trim().required("Answer is required"),
    })
  ),
  termsConditions: yup.string().trim(),
  refundPolicy: yup.string().trim(),
  ageRestriction: yup
    .string()
    .oneOf(["all", "18+", "21+"], "Invalid age restriction")
    .default("all"),
});
