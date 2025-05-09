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
      required: [true, "First name is required"],
      minlength: [3, "First name must be at least 3 characters"],
      maxlength: [20, "First name must be at most 20 characters"],
      trim: true,
      lowercase: true,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      minlength: [3, "Last name must be at least 3 characters"],
      maxlength: [20, "Last name must be at most 20 characters"],
      trim: true,
      lowercase: true,
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
      type: String,
      trim: true,
    },
    image: ImageSchema,
    about: {
      type: String,
      trim: true,
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
    },
    country: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    positionName: {
      type: String,
      trim: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", null],
      default: null,
    },
    phone: {
      type: String,
      trim: true,
    },
    website: {
      type: String,
      trim: true,
    },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

const User = models.User || model("User", userSchema);

export default User;
