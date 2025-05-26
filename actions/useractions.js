"use server"

import { User } from "@/models/user";
import connectDB from "@/db/connectDb";
import { Payment } from "@/models/payment";
import { headers } from "next/headers";

export const initiate = async (amount, to_username, paymentform) => {
    await connectDB();

    // Step 1: Get access token from PayPal
    const auth = Buffer.from(`${process.env.KEY_ID}:${process.env.KEY_SECRET}`).toString("base64");
    const tokenRes = await fetch("https://api-m.sandbox.paypal.com/v1/oauth2/token", {
        method: "POST",
        headers: { 
            Authorization: `Basic ${auth}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "grant_type=client_credentials",
    });
    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;

    // Step 2: Create PayPal order
    const orderRes = await fetch("https://api-m.sandbox.paypal.com/v2/checkout/orders", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
            intent: "CAPTURE",
            purchase_units: [
                {
                    amount: {
                        currency_code: "USD",
                        value: amount,
                    },
                },
            ],
        }),
    });

    const orderData = await orderRes.json();

    // Step 3: Save to DB as pending payment
    await Payment.create({
        oid: orderData.id,
        amount: parseFloat(amount),
        to_username: to_username,
        name: paymentform.name,
        message: paymentform.message,
        done: false,
    });

    return orderData;
};

export const fetchuser = async (username) => {
    await connectDB();
    const u = await User.findOne({ username });
    if(!u){
        return null;
    }
     const plainUser = u.toObject();

    // Optionally, convert `_id` and `createdAt`, `updatedAt` to strings
    plainUser._id = plainUser._id.toString();
    plainUser.createdAt = plainUser.createdAt?.toISOString();
    plainUser.updatedAt = plainUser.updatedAt?.toISOString();

    return plainUser;

};

export const fetchpayment = async (username) => {
    await connectDB();
    return await Payment.find({ to_username: username, done: true }).sort({ amount: -1 }).lean();
};

export const updateProfile = async (data, oldusername) => {
  try {
    await connectDB(); // Ensure DB is connected

    // Normalize the input data
    const ndata = data instanceof FormData 
      ? Object.fromEntries(data.entries()) 
      : { ...data };

    console.log("Updating user:", oldusername);
    console.log("New data:", ndata);

    // Direct update
    await User.updateOne(
      { username: oldusername },
      { $set: ndata },
      { upsert: false } // Don't insert new user if not found
    );

    return { success: true };
  } catch (error) {
    console.error("Update error:", error);
    return { success: false, message: error.message };
  }
};
