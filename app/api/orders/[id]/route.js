import { NextResponse } from "next/server";

export async function PATCH() {
  return NextResponse.json(
    {
      success: false,
      message: "Order status is auto-managed",
    },
    { status: 403 }
  );
}
