import React from "react";
import ProductDetails from "../../../components/products/productDetails/ProductDetails";
import { fetchDetails } from "../../../utils/products/details/fetchDetails";

const SingleProductPage = async ({ params }) => {
  const product = await fetchDetails(params?.slug);

  return (
    <div className="max-w-screen-xl mx-auto p-2">
      <ProductDetails product={product?.result} />
    </div>
  );
};

export default SingleProductPage;
