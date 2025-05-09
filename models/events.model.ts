import { models, Schema, model } from "mongoose";
import ImageSchema from "./image.model";

const TicketTierSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: true }
);

const EventSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    shortDescription: {
      type: String,
      trim: true,
    },
    dateTime: {
      start: {
        type: String,
        required: true,
      },
      end: {
        type: String,
        required: true,
      },
    },
    location: {
      venue: {
        type: String,
        trim: true,
      },
      address: {
        type: String,
        trim: true,
      },
      city: {
        type: String,
        trim: true,
      },
      country: {
        type: String,
        trim: true,
      },
      onlineEvent: {
        type: Boolean,
        default: false,
      },
      meetingLink: {
        type: String,
        trim: true,
      },
    },
    eventBanner: ImageSchema,
    userID: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: ["draft", "published", "cancelled", "postponed"],
      default: "draft",
    },
    category: {
      type: String,
      required: true,
      enum: [
        "conference",
        "workshop",
        "concert",
        "exhibition",
        "networking",
        "sports",
        "other",
      ],
      default: "other",
    },
  
    ticketTypes: [TicketTierSchema],
    isFree: {
      type: Boolean,
      default: false,
    },
    currency: {
      type: String,
      uppercase: true,
      trim: true,
      maxlength: 3,
    },
    views: {
      type: Number,
      default: 0,
      min: 0,
    },
    registration: {
      externalLink: {
        type: String,
        trim: true,
      },
      status: {
        type: String,
        enum: ["open", "closed", "soldout"],
        default: "open",
      },
      closeDate: {
        type: String,
      },
    },
    organizer: {
      name: {
        type: String,
        trim: true,
      },
      email: {
        type: String,
        trim: true,
        lowercase: true,
      },
      phone: {
        type: String,
        trim: true,
      },
      website: {
        type: String,
        trim: true,
      },
      socialMedia: {
        facebook: { type: String, trim: true },
        instagram: { type: String, trim: true },
      },
      bio: {
        type: String,
        trim: true,
      },
      image: ImageSchema,
    },
    speakers: [
      {
        name: {
          type: String,
          required: true,
          trim: true,
        },
      
        bio: {
          type: String,
          trim: true,
        },
        socialMedia: {
          instagram: { type: String, trim: true },
          facebook: { type: String, trim: true },
        },
      },
    ],
    sponsors: [
      {
        name: {
          type: String,
          required: true,
          trim: true,
        },
        tier: {
          type: String,
          enum: ["platinum", "gold", "silver", "bronze"],
          default: "silver",
        },
        website: {
          type: String,
          trim: true,
        },
      },
    ],

    faqs: [
      {
        question: {
          type: String,
          required: true,
          trim: true,
        },
        answer: {
          type: String,
          required: true,
          trim: true,
        },
      },
    ],
    termsConditions: {
      type: String,
      trim: true,
    },
    refundPolicy: {
      type: String,
      trim: true,
    },
    ageRestriction: {
      type: String,
      enum: ["all", "18+", "21+"],
      default: "all",
    },
  },
  { timestamps: true }
);

const Event = models.Event || model("Event", EventSchema);
export default Event;
