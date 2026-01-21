import mongoose from "mongoose";

const BulkOrderSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    eventType: String,
    eventDate: String,
    message: String,
  },
  { timestamps: true }
);

export default mongoose.models.BulkOrder ||
  mongoose.model("BulkOrder", BulkOrderSchema);
