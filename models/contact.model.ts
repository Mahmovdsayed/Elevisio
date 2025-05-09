import { models, Schema, model } from "mongoose";

const allowedPlatforms = [
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
];

const ContactSchema = new Schema(
  {
    userID: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    socialLinks: [
      {
        platform: {
          type: String,
          enum: allowedPlatforms,
          required: true,
        },
        url: {
          type: String,
          trim: true,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Contact = models.Contact || model("Contact", ContactSchema);
export default Contact;
