import React from "react";
import BannerForm from "../_compo/bannerForm";
import { fetchProducts } from "@/utils/products/fetchProducts";

const AUBannerPage = async ({ params }) => {
  const id = params?.id;

  const products = await fetchProducts();

  return (
    <div>
      <BannerForm products={products} />
    </div>
  );
};

export default AUBannerPage;
