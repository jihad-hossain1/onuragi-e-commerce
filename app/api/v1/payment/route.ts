import connectDatabase from "@/src/config/mongodbConnection";
import User from "@/src/models/user.models";
import { NextRequest, NextResponse } from "next/server";
import SSLCommerzPayment from "sslcommerz-lts";

const store_id = `${process.env.STORE_ID}`;
const store_passwd = `${process.env.STORE_PASS}`;
const is_live = false;

const tran_id = new Object().toString();

export async function POST(req: NextRequest) {
  const { userId } = await req.json();
  console.log("🚀 ~ POST ~ userId:", userId);

  const data = {
    total_amount: 100,
    currency: "BDT",
    tran_id: tran_id, // use unique tran_id for each api call
    success_url:
      "http://localhost:3000/customer-dashboard/cart/checkout/success",
    fail_url: "http://localhost:3000/customer-dashboard/cart/checkout/fail",
    cancel_url: "http://localhost:3000/customer-dashboard/cart/checkout/cancel",
    ipn_url: "http://localhost:3000/customer-dashboard/cart/checkout/ipn",
    shipping_method: "Courier",
    product_name: "Computer.",
    product_category: "Electronic",
    product_profile: "general",
    cus_name: "Customer Name",
    cus_email: "customer@example.com",
    cus_add1: "Dhaka",
    cus_add2: "Dhaka",
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    cus_phone: "01711111111",
    cus_fax: "01711111111",
    ship_name: "Customer Name",
    ship_add1: "Dhaka",
    ship_add2: "Dhaka",
    ship_city: "Dhaka",
    ship_state: "Dhaka",
    ship_postcode: 1000,
    ship_country: "Bangladesh",
  };
  try {
    connectDatabase("user");

    const findUser = await User.findOne({ _id: userId });

    // const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    // const result = sslcz.init(data).then((apiResponse) => {
    //   // Redirect the user to payment gateway
    //   let GatewayPageURL = apiResponse.GatewayPageURL;
    //   // NextResponse.redirect(GatewayPageURL);
    //   // NextResponse.redirect(GatewayPageURL);
    //   console.log("Redirecting to: ", GatewayPageURL);
    // });

    return NextResponse.json({ result: findUser }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
