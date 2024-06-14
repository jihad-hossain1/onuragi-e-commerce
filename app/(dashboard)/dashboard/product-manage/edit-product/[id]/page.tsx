import EditProduct from "@/components/Dashboard/productMange/productAction/EditProduct";
import { fetchProductById } from "@/utils/products/byId/fetchById";
import { fetchSubCategories } from "@/utils/sub-categories/fetchSubCategories";
import React from "react";

const EditProductpage = async ({ params }) => {
  const product = await fetchProductById(params?.id);
  const categories = await fetchSubCategories();
  return (
    <div>
      <EditProduct product={product} categories={categories} />
    </div>
  );
};

export default EditProductpage;
