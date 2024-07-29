"use client";

import React from "react";
import ProductDetail from "./ProductDetail";
import ProductSpecifications from "./ProductSpecifications";

const ProductDetails = ({ product, questions, reviews }) => {
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
        reviews={reviews}
      />
    </div>
  );
};

export default ProductDetails;
