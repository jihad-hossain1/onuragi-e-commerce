import React from "react";
import DropDownAction from "./DropDownAction";

const LinkWithId = ({ productID, specification, details }) => {
  return (
    <>
      <DropDownAction
        details={details}
        productID={productID}
        specification={specification}
      />
    </>
  );
};

export default LinkWithId;
