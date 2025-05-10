import { models, Schema, model } from "mongoose";
import ImageSchema from "./image.model";

const BlogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    userID: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    category: {
      type: String,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    seoKeywords: [String],
    blogImage: ImageSchema,
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "published",
    },
  },
  { timestamps: true }
);

const Blog = models.Blog || model("Blog", BlogSchema);
export default Blog;
