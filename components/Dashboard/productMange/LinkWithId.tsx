
import { getProductDetails } from '@/app/api/frontend/products/product-details'
import { getProductSpecification } from '@/app/api/frontend/products/specification'
import React from "react";
import DropDownAction from "./DropDownAction";

const LinkWithId = async ({ productID, specification, details }) => {
  // let initialDetail;
  // if (productID) {
  //   const productDetails = await getProductDetails(productID);
  //   initialDetail = productDetails;
  // }

  // let specificationData;

  // if (productID) {
  //   const productSpecification = await getProductSpecification(productID);
  //   specificationData = productSpecification;
  // }

  // let pid;
  // if (productID) {
  //   pid = productID;
  // }
  return (
    <>
      <DropDownAction
        details={details}
        productID={productID}
        specification={specification}
        // productDetails={initialDetail}
        // productSpecification={specificationData}
      />
    </>
  );
};

export default LinkWithId