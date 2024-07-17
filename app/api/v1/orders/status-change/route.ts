import connectDatabase from "@/src/config/mongodbConnection";
import EcomDelivery from "@/src/models/ecomdelivery";
import User from "@/src/models/user.models";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  const { uid, orderId, info, status } = await req.json();

  try {
    await connectDatabase("E-Commerce db");

    const updateOrder = await EcomDelivery.findByIdAndUpdate(
      orderId,
      { status: status },
      { new: true }
    );

    if (!updateOrder) {
      return NextResponse.json(
        { error: "order are not found" },
        { status: 400 }
      );
    }

    const updateUserDeliveryStatus = await User.findByIdAndUpdate(
      updateOrder?.userId,
      {
        $push: {
          deliveries: {
            did: updateOrder?.did,
            status: status,
          },
        },
      },
      { new: true }
    );

    // // update order status
    if (!updateUserDeliveryStatus) {
      return NextResponse.json(
        { error: "user are not found" },
        { status: 400 }
      );
    }

    return NextResponse.json({ result: "success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
