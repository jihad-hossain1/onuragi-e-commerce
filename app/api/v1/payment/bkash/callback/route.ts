import { NextRequest,NextResponse } from "next/server";
import axios from "axios";
import bkash_headers from "@/helpers/payment/bkash/bkash_header";
import PaymentHistory from "@/src/models/paymentHistory";


export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const paymentID = searchParams.get("paymentID");
    const status = searchParams.get("status");
    const userId = searchParams.get("userId");

    try {
        
        if (status === 'cancel' || status === 'failure') {
            return NextResponse.redirect(`${process.env.NEXT_PUBLIC_API_URL}/error?message=${status}`)
        }

        if(status == 'success'){
            const { data } = await axios.post(process.env.bkash_execute_payment_url, { paymentID }, {
                headers: await bkash_headers()
            })
            if (data && data.statusCode === '0000') {

                // const {data: payData}  = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/cart/pay-confirm`,{payment: {
                //     tid: data.trxID,
                //     method: 'bkash',
                //     sc: ''
                // },userId})

                const newPaymentHistory = new PaymentHistory({
                    trxID: data.trxID,
                    date: new Date().toISOString(),
                    amount: data.amount,
                    paymentID: paymentID,
                    status: status,
                    orderId: "payData?.did",
                    userId: userId
                })
                await newPaymentHistory.save();

                return NextResponse.redirect(`${process.env.NEXT_PUBLIC_API_URL}/success?message=success`)
            }

        }

        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_API_URL}/error?message=${status}`)

    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}