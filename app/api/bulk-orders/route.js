export async function POST(req) {
  await connectDB();
  const body = await req.json();

  const order = await Order.create({
    ...body,
    orderType: "BULK",
    isBulk: true,              // 🔥 CRITICAL FIX
    status: "Enquiry Placed",
  });

  return NextResponse.json(
    { success: true, order },
    { status: 201 }
  );
}
