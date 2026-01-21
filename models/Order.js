import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    userName: {
      type: String,
    },

    userEmail: {
      type: String,
    },

    items: {
      type: Array,
      required: true,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    // 🔥 BULK ORDER SUPPORT
    orderType: {
      type: String,
      enum: ["NORMAL", "BULK"],
      default: "NORMAL",
    },

    isBulk: {
      type: Boolean,
      default: false,
    },

    bulkDetails: {
      eventDate: String,
      deliveryAddress: String,
      notes: String,
    },

    paymentMethod: {
      type: String,
      default: "COD",
    },

    paymentId: {
      type: String,
    },

    status: {
      type: String,
      default: "Placed",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Order ||
  mongoose.model("Order", OrderSchema);
