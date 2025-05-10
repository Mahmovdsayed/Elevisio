import { models, Schema, model } from "mongoose";
import ImageSchema from "./image.model";

const CertificateSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    userID: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    certificateImage: ImageSchema,
    certificateURL: {
      type: String,
      trim: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Certificate =
  models.Certificate || model("Certificate", CertificateSchema);
export default Certificate;
