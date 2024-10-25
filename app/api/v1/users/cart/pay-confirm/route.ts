import { orderConfirmationMailBody, OrderConfirmationMailBodyType } from "@/helpers/mail-service/mailBody";
import { sendEmails } from "@/helpers/mail-service/mailTransporter";
import { fieldValidate, validateOBJID } from "@/helpers/validetField";
import connectDatabase from "@/src/config/mongodbConnection";
import EcomDelivery from "@/src/models/ecomdelivery";
import Product from "@/src/models/product.models";
import User from "@/src/models/user.models";
import { NextRequest, NextResponse } from "next/server";

async function generateUniqueID(): Promise<string> {
  await connectDatabase("Ecommerce");
  const previousEcom = await EcomDelivery.find({});

  const rememberPreviousItemCodes = previousEcom?.map((order) => order?.did);

  // Extract the numeric part of the IDs and find the maximum number
  const maxNumber = rememberPreviousItemCodes?.reduce((max, id) => {
    const num = parseInt(id?.replace("OID", ""), 5);
    return num > max ? num : max;
  }, 0);

  // Increment the maximum number by 1
  const nextNumber = maxNumber + 1;

  // Format the new ID with leading zeros
  const newID = `OID${nextNumber?.toString()?.padStart(5, "0")}`;

  return newID;
}

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

    const newId = await generateUniqueID();
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
      did: newId,
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

    // decrese product quantity
    // await Promise.all(
    //   userCarts.map(async (item) => {
    //     const product = await Product.findOneAndUpdate(
    //       { _id: item.product },
    //       {
    //         $inc: {
    //           quantity: -item.quantity,
    //         },
    //       }
    //     );
    //   })
    // );

    const mailData: OrderConfirmationMailBodyType = {
      orderNumber: newId,
      orderDate: new Date().toISOString(),
      totalAmount: totalPrice,
      deliveryAddress: {
        street: user?.profile?.deliveryAddress?.dstreet,
        city: user?.profile?.deliveryAddress?.dcity,
        zipCode: user?.profile?.deliveryAddress?.dzipCode,
      },
      paymentMethod: {
        method: payment?.method,
        tid: payment?.tid,
      },
      items: populatedCart?.map((item)=>({
        name: item?.details?.name,
        quantity: item?.quantity,
        price: item?.details?.price,
        color: item?.color,
        size: item?.size
      }))
    }

   await sendEmails(
      user?.email,
      "Order Confirmation",
      orderConfirmationMailBody(mailData)
      )

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
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
