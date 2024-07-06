import { fieldValidate, validateOBJID } from "@/helpers/validetField";
import connectDatabase from "@/src/config/mongodbConnection";
import EcomDelivery from "@/src/models/ecomdelivery";
import Product from "@/src/models/product.models";
import User from "@/src/models/user.models";
import { NextRequest, NextResponse } from "next/server";

// generate random id
function generateRandomId() {
  return (
    Math.random().toString(36).substring(2, 8) +
    Math.random().toString(36).substring(2, 8)
  );
}

export async function POST(req: NextRequest) {
  const { userId, payment } = await req.json();

  try {
    validateOBJID(userId, "User ID");
    fieldValidate(userId, "User ID");
    fieldValidate(payment?.tid, "Transaction ID");
    fieldValidate(payment?.method, "Payment Method");

    await connectDatabase("user");

    const user = await User.findOne({ _id: userId });

    if (!user) {
      return NextResponse.json({ error: "User not exist." }, { status: 404 });
    }

    const userCarts = user.carts;

    // Populate product details for each cart item
    const populatedCart = await Promise.all(
      userCarts.map(async (item) => {
        const product = await Product.findOne(
          { _id: item.product },
          "name price"
        );
        return {
          ...item._doc,
          details: product,
        };
      })
    );

    // Calculate the total price
    const totalPrice = populatedCart.reduce((sum, item) => {
      return sum + item.details.price * item.quantity;
    }, 0);

    // saved on EcomDelivery
    const createDelivery = await EcomDelivery.create({
      products: userCarts,
      userId: userId,
      payInfo: {
        tid: payment.tid,
        sc: payment.sc,
        method: payment.method,
      },
      address: {
        street: user?.profile?.deliveryAddress?.dstreet,
        city: user?.profile?.deliveryAddress?.dcity,
        zipCode: user?.profile?.deliveryAddress?.dzipCode,
      },
      totalPrice: totalPrice,
      did: generateRandomId(),
    });

    // create order
    const order = await User.updateOne(
      { _id: userId },
      {
        $push: {
          deliveries: {
            payInfo: {
              tid: payment.tid,
              sc: payment.sc,
              method: payment.method,
            },
            address: {
              street: user?.profile?.deliveryAddress?.dstreet,
              city: user?.profile?.deliveryAddress?.dcity,
              zipCode: user?.profile?.deliveryAddress?.dzipCode,
            },
            products: userCarts,
            totalPrice: totalPrice,
            did: createDelivery.did,
          },
        },
      }
    );

    // save on delivery
    // if (payment.method === "cod") {
    //     await User.updateOne({ _id: userId }, {
    //         $set: {
    //             "carts": [],
    //         },
    //     });
    // }

    const response = await User.updateOne(
      { _id: userId },
      {
        $set: {
          carts: [],
        },
      }
    );

    if (!response.acknowledged) {
      return NextResponse.json(
        { error: "Something went wrong." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { result: order, message: "Payment success." },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
