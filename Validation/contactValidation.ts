import * as yup from "yup";

const contactValidationSchema = yup.object({
  platform: yup
    .string()
    .trim()
    .required("Platform is required")
    .oneOf(
      [
        "facebook",
        "instagram",
        "twitter",
        "linkedIn",
        "github",
        "behance",
        "dribbble",
        "whatsapp",
        "telegram",
        "youtube",
        "tiktok",
        "discord",
        "snapchat",
        "pinterest",
        "reddit",
      ],
      "Invalid platform"
    ),
  url: yup.string().trim().url("Invalid URL").required("URL is required"),
});

export { contactValidationSchema };
