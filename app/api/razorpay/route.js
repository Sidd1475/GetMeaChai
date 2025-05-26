import { NextResponse } from "next/server";
import { Payment } from "@/models/payment";
import connectDB from "@/db/connectDb";

export const POST = async (req) => {
    await connectDB();

    const body = await req.json();
    const { orderID, username } = body;

    // Fetch payment details from PayPal using client credentials
    const auth = Buffer.from(`${process.env.KEY_ID}:${process.env.KEY_SECRET}`).toString('base64');

    const paypalRes = await fetch(`https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderID}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Basic ${auth}`
        }
    });

    const paymentData = await paypalRes.json();

    if (paymentData.status === "COMPLETED") {
        const updatedPayment = await Payment.updateOne(
            { oid: orderID },
            { done: "true" },
            { new: true }
        );

        return NextResponse.redirect(`${process.env.URL}/${username}?paymentdone=true`);
    } else {
        return NextResponse.json({ success: false, message: "Payment not completed." });
    }
};
// /pages/api/record-payment.js
export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).end();

    const { name, message, amount, username } = req.body;

    // Save this data to your DB here (Mongo, MySQL, etc.)
    // await db.savePayment({ name, message, amount, username });

    res.status(200).json({ success: true });
}
