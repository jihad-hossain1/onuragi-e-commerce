import connectDatabase from "@/src/config/mongodbConnection";
import EcomDelivery from "@/src/models/ecomdelivery";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { Document } from "mongoose";

interface EcomDeliveryDocument extends Document {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  products: { product: mongoose.Types.ObjectId; quantity: number }[];
  userId: mongoose.Types.ObjectId;
  totalPrice: number;
  status: string;
  payInfo: {
    tid: string;
    method: string;
  };
  address: {
    street: string;
    city: string;
    zipCode: string;
  };
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params?.id;

  try {
    await connectDatabase("Ecom delivery");

    const objectId = new mongoose.Types.ObjectId(id);

    const data = await EcomDelivery.aggregate([
      { $match: { _id: objectId } },
      {
        $lookup: {
          from: "products",
          localField: "products.product",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        $addFields: {
          products: {
            $map: {
              input: "$products",
              as: "prod",
              in: {
                $mergeObjects: [
                  "$$prod",
                  {
                    $arrayElemAt: [
                      {
                        $filter: {
                          input: "$productDetails",
                          as: "detail",
                          cond: { $eq: ["$$detail._id", "$$prod.product"] },
                        },
                      },
                      0,
                    ],
                  },
                ],
              },
            },
          },
          user: {
            $arrayElemAt: ["$userDetails", 0],
          },
        },
      },
      {
        $project: {
          "user._id": 1,
          "user.username": 1,
          "user.email": 1,
          _id: 1,
          createdAt: 1,
          totalPrice: 1,
          status: 1,
          payInfo: 1,
          address: 1,
          products: 1,
          did: 1,
        },
      },
    ]);

    if (!data || data.length === 0) {
      return NextResponse.json(
        { error: "Delivery order not found" },
        { status: 401 }
      );
    }

    return NextResponse.json({ result: data[0] }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
