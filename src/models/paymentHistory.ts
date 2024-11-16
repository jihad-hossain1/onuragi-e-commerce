import mongoose, { Schema, models } from "mongoose";

const paymentHistory = new Schema(
    {
        userId: {
            type: String,
        },
        trxID: {
            type: String,
        },

        date: {
            type: String,
        },
        amount: {
            type: Number,
        },
        paymentID: {
            type: String,
        },
        status: {
            type: String,
        },
        orderId: {
            type: String,
        }
    },
    {
        timestamps: true,
    },
);

const PaymentHistory =
    models.PaymentHistory || mongoose.model("PaymentHistory", paymentHistory);

export default PaymentHistory;
