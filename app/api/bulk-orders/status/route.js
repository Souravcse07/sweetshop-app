import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import BulkOrder from "@/models/BulkOrder";

export async function PATCH(req) {
  try {
    await connectDB();
    const { id, status } = await req.json();

    await BulkOrder.findByIdAndUpdate(id, { status });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
