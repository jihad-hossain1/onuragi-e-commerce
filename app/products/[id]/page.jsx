import ProductDetails from "@/components/products/productDetails/ProductDetails";
// import { getProductById } from "@/utils/fetch/product";
import React from "react";

const SingleProductpage = async ({ params }) => {
  const product = {};
  // const product = await getProductById(params?.id);

  return <ProductDetails product={product} />;
};

export default SingleProductpage;
