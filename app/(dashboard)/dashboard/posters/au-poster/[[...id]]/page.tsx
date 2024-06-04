import React from "react";
import AUPosterForm from "../_compo/AUPosterForm";
import { fetchProducts } from "@/utils/products/fetchProducts";
import { fetchSinglePoster } from "@/utils/poster/fetchSinglePoster";

const AUPosterPage = async ({ params }: { params: { id: string } }) => {
  const id = params?.id;
  const products = await fetchProducts();

  let initialData;

  if (id) {
    initialData = await fetchSinglePoster(id[0]);
  }
  return (
    <div>
      <AUPosterForm
        posterData={initialData?.result}
        id={id}
        products={products}
      />
    </div>
  );
};

export default AUPosterPage;
