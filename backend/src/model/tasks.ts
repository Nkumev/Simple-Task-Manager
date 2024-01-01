import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
  name: string;
  completed: boolean;
}

const taskSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "please add a task"],
    },
    completed: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model<ITask>("Task", taskSchema);

export default Task;
