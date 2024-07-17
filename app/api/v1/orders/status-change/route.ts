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

    const updateUserDeliveryStatus = await User.findById(updateOrder?.userId);

    const findUserDelivery = updateUserDeliveryStatus?.deliveries?.find(
      (order: { _id: string; status: string; did: string }) =>
        order?.did == updateOrder?.did
    );
    // // update order status
    if (!findUserDelivery) {
      return NextResponse.json(
        { error: "user order are not found" },
        { status: 400 }
      );
    }

    findUserDelivery.status = status;
    await updateUserDeliveryStatus?.save();

    return NextResponse.json({ result: "success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
