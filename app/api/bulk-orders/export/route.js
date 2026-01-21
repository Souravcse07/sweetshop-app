import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Order from "@/models/Order";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    console.log("📦 Bulk Order Received:", body);

    const {
      userId,
      userName,
      userEmail,
      items,
      totalAmount,
      bulkDetails,
      paymentMethod,
    } = body;

    // 🛑 Basic validation
    if (!userId || !items || !totalAmount) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const order = await Order.create({
      userId,
      userName,
      userEmail,
      items,
      totalAmount,
      bulkDetails,

      // 🔥 MARK AS BULK
      orderType: "BULK",
      isBulk: true,

      paymentMethod: paymentMethod || "COD",
      status: "Enquiry Placed",
    });

    return NextResponse.json(
      { success: true, order },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Bulk Order Save Failed:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
