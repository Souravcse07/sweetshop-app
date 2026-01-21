import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema(
  {
    name: String,
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Feedback ||
  mongoose.model("Feedback", FeedbackSchema);
