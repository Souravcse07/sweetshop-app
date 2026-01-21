import { NextResponse } from "next/server";
import Product from "@/models/Product";
import connectDB from "@/lib/db";

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    let filter = {};

    // ✅ Case-insensitive category match
    if (category) {
      filter.category = {
        $regex: `^${category}$`,
        $options: "i",
      };
    }

    const products = await Product.find(filter).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      products,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}
