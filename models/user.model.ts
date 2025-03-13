import { Schema, model, models } from "mongoose";
import ImageSchema from "./image.model";

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      lowercase: true,
      minlength: [3, "Username must be at least 3 characters"],
      maxlength: [20, "Username must be at most 20 characters"],
      index: true,
    },
    firstName: {
      type: String,
      trim: true,
      lowercase: true,
      default: "No firstName provided yet",
    },
    secondName: {
      type: String,
      trim: true,
      lowercase: true,
      default: "No secondName provided yet",
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
        "Please provide a valid email address",
      ],
      index: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      trim: true,
    },
    birthday: {
      type: Date,
      default: null,
    },
    image: ImageSchema,
    about: {
      type: String,
      trim: true,
      default: "No about provided yet",
    },
    bio: {
      type: String,
      trim: true,
      default: "No bio available yet",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: String,
      default: null,
    },
    otpExpiry: {
      type: Date,
      default: null,
    },
    nationality: {
      type: String,
      trim: true,
      default: "Not provided",
    },
    country: {
      type: String,
      trim: true,
      default: "Not provided",
    },
    city: {
      type: String,
      trim: true,
      default: "Not provided",
    },
    positionName: {
      type: String,
      trim: true,
      default: "Not provided",
    },
    gender: {
      type: String,
      enum: ["male", "female", null],
      default: null,
    },
    phone: {
      type: String,
      trim: true,
      default: "Not provided",
    },
    website: {
      type: String,
      trim: true,
      default: "Not provided",
    },
  },
  { timestamps: true }
);

const User = models.User || model("User", userSchema);

export default User;
