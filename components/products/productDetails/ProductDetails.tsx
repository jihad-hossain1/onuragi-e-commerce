"use client";

import React from "react";
import ProductDetail from "./ProductDetail";
import ProductSpecifications from "./ProductSpecifications";

const ProductDetails = ({ product }) => {
  return (
    <div>
      <ProductDetail product={product?.product} images={product?.images} />
      <ProductSpecifications
        specification={product?.specification}
        product={product?.product}
        details={product?.details}
      />
    </div>
  );
};

export default ProductDetails;
