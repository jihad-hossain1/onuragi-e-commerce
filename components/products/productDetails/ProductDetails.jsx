"use client";

import Container from "@/components/ui/container";
import React from "react";
import ProductDetail from "./ProductDetail";
import ProductSpecifications from "./ProductSpecifications";

const ProductDetails = ({ product }) => {
  console.log("🚀 ~ ProductDetails ~ product:", product);
  return (
    <Container>
      <ProductDetail product={product?.product} images={product?.images} />
      <ProductSpecifications specification={product?.specification} />
    </Container>
  );
};

export default ProductDetails;
