import { Schema, model } from "mongoose";

const todoSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default model("Todo", todoSchema);