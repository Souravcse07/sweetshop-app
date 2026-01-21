import { NextResponse } from "next/server";
import Product from "@/models/Product";
import connectDB from "@/lib/db";


export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { name, price, image, category } = body;

    if (!name || !price || !image || !category) {
      return NextResponse.json({
        success: false,
        error: "All fields are required",
      });
    }

    const product = await Product.create({
      name,
      price,
      image,
      category,
    });

    return NextResponse.json({
      success: true,
      product,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}
