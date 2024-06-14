import AddSpecification from "@/components/Dashboard/productMange/AddSpecification";
import { fetchSpec } from "@/utils/products/fetchSpec";
import React from "react";

const AddSpecificationpage = async ({ params }) => {
  const id = params?.id;
  const splitId = id[0]?.split("%3D")[1];
  const productID = id[0]?.split("%3D")[0];

  let initialValue: any;
  if (splitId) {
    initialValue = await fetchSpec(splitId);
  }

  return (
    <>
      <AddSpecification
        productID={productID}
        specId={splitId}
        specValue={initialValue?.specifications}
      />
    </>
  );
};

export default AddSpecificationpage;
