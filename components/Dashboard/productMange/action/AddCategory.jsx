"use client";

import { Button } from "@/components/ui/button";

const AddCategory = () => {
  // console.log(categories);
  return (
    <>
      <Button
        size="sm"
        varient="outline"
        className="text-xs bg-pink-600 shadow-sm hover:shadow hover:bg-pink-600/90"
      >
        Add Category
      </Button>
    </>
  );
};

export default AddCategory;
