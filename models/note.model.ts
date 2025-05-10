import { models, Schema, model } from "mongoose";

const NoteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    type: {
      enum: ["note", "task", "todo"],
      type: String,
      default: "note",
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    priority: {
      enum: ["low", "medium", "high"],
      type: String,
      default: "medium",
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

const Note = models.Note || model("Note", NoteSchema);
export default Note;
