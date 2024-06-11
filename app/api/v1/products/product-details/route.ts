import connectDatabase from "@/src/config/mongodbConnection";
import Image from "@/src/models/image.models";
import Product from "@/src/models/product.models";
import ProductDetail from "@/src/models/productDetails.models";
import ProductSpecification from "@/src/models/productSpecification.models";
import { validateJSON } from "@/utils/validateJSON";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const reqBody = await req.json();
  try {
    // checker for anyone can send undefine or {} or null value in api requiest
    const isValid = validateJSON(reqBody);

    if (isValid === true) {
      const { productID, about, sizeGuide, sizes } = reqBody;

      // check product size with any empty array
      if (sizes?.length == 0) {
        return NextResponse.json(
          {
            message: "Please provide minimum two size with price",
          },
          { status: 400 }
        );
      }
      // check productID valid or invalid
      if (!mongoose.Types.ObjectId.isValid(productID)) {
        return NextResponse.json(
          {
            message: "your product id is not valid",
          },
          { status: 400 }
        );
      }

      // calculate product quantity
      const productQuantity = sizes?.reduce(
        (previous, current) => previous + current?.quantity,
        0
      );
      await connectDatabase("product details");
      //   build new product details
      const newDetails = new ProductDetail({
        productID,
        about,
        sizeGuide,
        quantity: productQuantity,
        sizes,
      });
      const savedDetails = await newDetails.save();

      // Update the product with the new specification ID
      const updateProduct = await Product.findByIdAndUpdate(
        productID,
        { $set: { details: savedDetails._id } },
        { new: true }
      );

      return NextResponse.json(
        {
          message: "product details added successfull",
          productDetail: savedDetails,
        },
        { status: 201 }
      );
    } else {
      return NextResponse.json({ message: "inavlid fields: ", isValid });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "You got an error from server: ", error },
      { status: 500 }
    );
  }
}


export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const productSlug = searchParams.get("slug");
  const sliceSlug = productSlug?.split("=")[0];
  const sliceId = productSlug?.split("=")[1];

  try {
   
    await connectDatabase("product details");
    
    let result = {};

    const product = await Product.findOne({
      $or: [{ _id: sliceId }, { slug: sliceSlug }],
    })    

    const findDetails = await ProductDetail.findOne({
      productID: product?._id,
    });

    const findSpecification = await ProductSpecification.findOne({
      productID: product?._id,
    })

    const findImages = await Image.findOne({ productID: product?._id });

    result = {
       product: product,
       details: findDetails,
       specification: findSpecification,
       images: findImages,
     }
    
 return NextResponse.json(
   {
     result: result,
   },
   { status: 200 }
 );
    
  } catch (error) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}

// interface IQuery {
//   slug?: string;
//   _id?: string;
// }

// export async function GET(req: NextRequest) {
//   const searchParams = req.nextUrl.searchParams;

//   const productSlug = searchParams.get("slug");
//   console.log("🚀 ~ GET ~ productSlug:", productSlug);
//   const sliceSlug = productSlug?.split("=")[0];
//   const sliceId = productSlug?.split("=")[1];

//   try {
//     await connectDatabase("product details");

//     let productDetails: any;

//     // Construct the query object dynamically
//     const query: IQuery = {};

//     // Conditionally add fields to the query object
//     if (sliceSlug) {
//       query.slug = sliceSlug.trim().toLowerCase();
//     }

//     if (sliceId) {
//       query._id = sliceId;
//     }

//     console.log("🚀 ~ GET ~ query:", query);

//     const product = await Product.findOne(query)
//       .populate("details")
//       .populate("specification");

//     // console.log("🚀 ~ GET ~ product:", product);

//     // const findDetails = await ProductDetail.findOne({
//     //   productID: product?._id,
//     // });

//     // // console.log("🚀 ~ GET ~ findSpecification:", findSpecification);

//     // const findSpecification = await ProductSpecification.findOne({
//     //   productID: product?._id,
//     // }).select("_id specification ");

//     // const findImages = await Image.find({ productID: product?._id });

//     // productDetails = {
//     //   product: product,
//     //   details: findDetails,
//     //   specification: findSpecification,
//     //   images: findImages,
//     // };

//     return NextResponse.json({ result: product }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error: error?.message }, { status: 500 });
//   }
// }