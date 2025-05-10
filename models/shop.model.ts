import { models, Schema, model } from "mongoose";
import ImageSchema from "./image.model";

const ShopSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    description: { type: String, trim: true, required: true },
    price: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
      default: null,
    },
    hasDiscount: {
      type: Boolean,
      default: false,
    },
    purchaseLink: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    productImage: ImageSchema,
    userID: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Shop = models.Shop || model("Shop", ShopSchema);
export default Shop;
