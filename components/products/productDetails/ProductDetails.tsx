"use client";

import React from "react";
import ProductDetail from "./ProductDetail";
import ProductSpecifications from "./ProductSpecifications";

const ProductDetails = ({ product, questions }) => {
  // console.log("🚀 ~ ProductDetails ~ product:", product);
  return (
    <div>
      <ProductDetail
        product={product?.product}
        details={product?.details}
        images={product?.images}
      />
      <ProductSpecifications
        specification={product?.specification}
        product={product?.product}
        details={product?.details}
        questions={questions}
      />
    </div>
  );
};

export default ProductDetails;
