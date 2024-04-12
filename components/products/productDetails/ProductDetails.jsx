import Container from "@/components/ui/container";
import Image from "next/image";
import React from "react";
import { timeStemp } from "@/utils/time-stemp";

const ProductDetails = ({ product }) => {
  console.log("🚀 ~ ProductDetails ~ product:", product);
  return (
    <Container>
      <Image
        alt="product image"
        src={product?.image}
        height={600}
        width={1000}
        className="w-full h-full"
      />

      <div>
        <h4 className="text-2xl ">{product?.name}</h4>
        <h4 className="text-3xl">${product?.price}</h4>
        <h4>{product?.categoryID?.name}</h4>
        <h4>{timeStemp(product?.createdAt)}</h4>
        <h4>{product?.quantity}</h4>
      </div>
    </Container>
  );
};

export default ProductDetails;
