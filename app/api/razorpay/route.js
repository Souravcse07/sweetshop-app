const Razorpay = require("razorpay");

export async function POST(req) {
  try {
    const { amount } = await req.json();

    if (!process.env.RAZORPAY_KEY || !process.env.RAZORPAY_SECRET) {
      return Response.json({
        success: false,
        error: "Missing Razorpay keys",
      });
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    return Response.json({ success: true, order });
  } catch (error) {
    return Response.json({
      success: false,
      error: error.message,
    });
  }
}
