import AddproductDetails from '@/components/Dashboard/productMange/addproduct-details';
import { fetchDetail } from "@/utils/products/details/fetchDetail";
import React from "react";

const AddproductDetailspage = async ({ params }) => {
  const id = params?.id;
  const splitId = id[0]?.split("%3D")[1];
  const productID = id[0]?.split("%3D")[0];

  let initialValue;
  if (splitId) {
    initialValue = await fetchDetail(splitId);
  }
  return (
    <>
      <AddproductDetails
        productID={productID}
        detailId={splitId}
        detailValue={initialValue?.productDetail}
      />
    </>
  );
};

export default AddproductDetailspage