"use client";

import Container from "@/components/ui/container";
import Image from "next/image";
import React from "react";

const ProductDetails = ({ product }) => {
  //   console.log(product);
  return (
    <Container>
      <Image
        alt="product image"
        src={product?.image}
        height={300}
        width={800}
        className="max-w-[350px] lg:w-[390px] max-h-[300px]"
      />
    </Container>
  );
};

export default ProductDetails;
