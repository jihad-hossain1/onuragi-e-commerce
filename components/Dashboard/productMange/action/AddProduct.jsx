import { Button } from "@/components/ui/button";
import React from "react";

const AddProduct = () => {
  return (
    <>
      <Button
        size="sm"
        varient="outline"
        className="text-xs bg-pink-600 shadow-sm hover:shadow hover:bg-pink-600/90"
      >
        Add Product
      </Button>
    </>
  );
};

export default AddProduct;
