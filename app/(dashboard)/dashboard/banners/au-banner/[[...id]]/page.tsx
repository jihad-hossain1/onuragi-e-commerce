import React from "react";
import BannerForm from "../_compo/bannerForm";
import { fetchProducts } from "@/utils/products/fetchProducts";
import { fetchSingleBanner } from "@/utils/banner/fetchSingleBanner";

const AUBannerPage = async ({ params }) => {
  const id = params?.id;

  const products = await fetchProducts();

  let initialData;

  if (id) {
    initialData = await fetchSingleBanner(id[0]);
  }

  return (
    <div className="max-w-screen-xl m-auto p-2">
      <BannerForm
        id={id}
        products={products}
        bannerData={initialData?.result}
      />
    </div>
  );
};

export default AUBannerPage;
