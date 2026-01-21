import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Feedback from "@/models/Feedback";

export async function POST(req) {
  await connectDB();
  const body = await req.json();
  const feedback = await Feedback.create(body);
  return NextResponse.json({ success: true, feedback });
}

export async function GET() {
  await connectDB();
  const feedbacks = await Feedback.find().sort({ createdAt: -1 });
  return NextResponse.json({ success: true, feedbacks });
}
