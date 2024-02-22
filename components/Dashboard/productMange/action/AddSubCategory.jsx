import { Button } from "@/components/ui/button";
import React from "react";

const AddSubCategory = () => {
  return (
    <>
      <Button
        size="sm"
        varient="outline"
        className="text-xs bg-pink-600 shadow-sm hover:shadow hover:bg-pink-600/90"
      >
        Add SubCategory
      </Button>
    </>
  );
};

export default AddSubCategory;
