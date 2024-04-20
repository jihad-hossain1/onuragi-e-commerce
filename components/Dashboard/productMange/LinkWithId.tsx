
import { getProductDetails } from '@/app/api/frontend/products/product-details'
import { getProductSpecification } from '@/app/api/frontend/products/specification'
import React from "react";
import DropDownAction from "./DropDownAction";

const LinkWithId = async ({ productID }) => {
  const productDetails = await getProductDetails(productID);
  const productSpecification = await getProductSpecification(productID);

  return (
    <>
      <DropDownAction
        productID={productID}
        productDetails={productDetails}
        productSpecification={productSpecification}
      />
    </>
  );
};

export default LinkWithId