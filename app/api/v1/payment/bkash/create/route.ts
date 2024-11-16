
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import bkash_headers from "@/helpers/payment/bkash/bkash_header";

function generateUnique(){
    return Math.random().toString(36).substring(2, 8)
}


export async function POST(request: NextRequest) {
    const { amount, userId, invoiceId } = await request.json();

    try {
        const { data } = await axios.post(
            process.env.bkash_create_payment_url as string,
            {
                mode: "0011",
                payerReference: " ",
                callbackURL:
                    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/payment/bkash/callback`,
                amount: amount,
                currency: "BDT",
                intent: "sale",
                merchantInvoiceNumber: generateUnique(),
            },
            {
                headers: await bkash_headers(),
            },
        );
        console.log("🚀 ~ POST ~ data:", data)

        return NextResponse.json({ bkashURL: data.bkashURL }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}
