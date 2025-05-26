// components/paypalButton.js
'use client';

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PaypalButton = ({ amount, name, message, username }) => {
  if (!amount || amount <= 0) return null;

  return (
    <PayPalScriptProvider options={{ "client-id": "AYN6R2_M8ApM7cvieLZ99GnRh9-7fmKKJ549UT9HizyCMRETAQwmwATv1v52Jk5U-XFkRZv44Rn23wfH", currency: "USD" }}>
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: { value: amount },
                description: `Support for ${username}`,
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
            alert("Payment Successful by " + details.payer.name.given_name);
            // You can call your backend here to save the payment
          });
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PaypalButton;

