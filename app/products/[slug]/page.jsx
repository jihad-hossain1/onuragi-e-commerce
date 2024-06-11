// import { getProductById } from "@/app/api/frontend/products/products";
import ProductDetails from "@/components/products/productDetails/ProductDetails";
import { fetchDetails } from "../../../utils/products/details/fetchDetails";
import React from "react";

const SingleProductPage = async ({ params }) => {
  // console.log("🚀 ~ SingleProductPage ~ params:", params);
  const product = await fetchDetails(params?.slug);
  // console.log("🚀 ~ SingleProductPage ~ product:", product);

  return <ProductDetails product={product?.result} />;
};

export default SingleProductPage;
