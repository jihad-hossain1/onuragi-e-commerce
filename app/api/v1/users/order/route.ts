import { validateOBJID } from "@/helpers/validetField";
import connectDatabase from "@/src/config/mongodbConnection";
import EcomDelivery from "@/src/models/ecomdelivery";
import User from "@/src/models/user.models";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const uid = searchParams.get("id");
  const { id, status } = await req.json();

  try {
    validateOBJID(uid, "User ID");

    await connectDatabase("User db");

    const findUser = await User.findById(uid);

    if (!findUser) {
      return NextResponse.json(
        { error: "user are not found" },
        { status: 400 }
      );
    }

    const findOrder = findUser?.deliveries?.find(
      (order: { _id: string; status: string }) => order?._id == id
    );

    if (!findOrder) {
      return NextResponse.json(
        { error: "order are not found" },
        { status: 400 }
      );
    }

    if (findOrder?.status == "pending") {
      findOrder.status = status;
      await findUser.save();

      const changeStatusOnEcom = await EcomDelivery.findOne({
        did: findOrder?.did,
      });

      changeStatusOnEcom.status = status;
      await changeStatusOnEcom.save();

      return NextResponse.json(
        { message: "order status updated", result: "success" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          error: `You are not able to update this order. current status: ${findOrder.status}`,
        },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
