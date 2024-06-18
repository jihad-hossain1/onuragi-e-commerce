import React from "react";
import ProductDetails from "../../../components/products/productDetails/ProductDetails";
import { fetchDetails } from "../../../utils/products/details/fetchDetails";
import { fetchQuestions } from "@/utils/questions/fetchQuestions";

const SingleProductPage = async ({ params }) => {
  const product = await fetchDetails(params?.slug);

  let initialQuestions;
  if (product?.result?.product?._id) {
    initialQuestions = await fetchQuestions(product?.result?.product?._id);
  }

  return (
    <div className="max-w-screen-xl mx-auto p-2">
      <ProductDetails product={product?.result} questions={initialQuestions} />
    </div>
  );
};

export default SingleProductPage;
