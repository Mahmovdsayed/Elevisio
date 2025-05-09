import { models, Schema, model } from "mongoose";

const CvSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    isMainCV: {
      type: Boolean,
      default: false,
    },
    CV: {
      url: { type: String, required: true },
      public_id: { type: String, required: false },
    },
    userID: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

const CV = models.CV || model("CV", CvSchema);
export default CV;
