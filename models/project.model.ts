import { models, Schema, model } from "mongoose";
import ImageSchema from "./image.model";

const ProjectsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    projectImage: ImageSchema,
    userID: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    clientName: {
      type: String,
      trim: true,
    },

    from: { type: String, required: true },
    to: { type: String },
    projectType: {
      type: String,
      required: true,
      enum: ["Tech", "Design", "Marketing", "Business", "Creative", "Other"],
      default: "Tech",
    },
    techStack: [String],
    designTools: [String],

    projectURL: {
      type: String,
    },
    githubURL: String,
    designFileURL: String,
    status: {
      type: String,
      enum: ["Planned", "In-Progress", "Completed", "On-Hold"],
      default: "Completed",
    },
  },

  { timestamps: true }
);

const Projects = models.Projects || model("Projects", ProjectsSchema);
export default Projects;
