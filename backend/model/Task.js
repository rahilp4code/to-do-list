import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: String, required: true }, // YYYY-MM-DD
  text: { type: String, required: true },
  done: { type: Boolean, default: false },
});

const Task = mongoose.model("Task", taskSchema);
export default Task;
