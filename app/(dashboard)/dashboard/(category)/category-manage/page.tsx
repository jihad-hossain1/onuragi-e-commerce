"use client";

import UpdateCat from "@/components/Dashboard/Category/updateCat";
import React from "react";
import AddCategory from "@/components/Dashboard/Category/AddCategory";

const Categorypage = () => {
  // const categories = await fetchCategories();
  const [categories, setCategories] = React.useState([]);

  React.useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch(`/api/v1/category`);
      const result = await res.json();
      setCategories(result);
    };
    fetchCategories();
  }, []);
  return (
    <>
      <AddCategory />
      <div className="flex flex-col gap-3">
        <h4>Total Categories: {categories?.length || 0} </h4>
        <div>
          {categories?.map(
            (category: { name: string; _id: string }, _ind: number) => (
              <h4 key={category?._id} className="flex items-center gap-2">
                <span>{_ind + 1}.</span>
                <span>{category?.name}</span>
                <UpdateCat name={category?.name} _id={category?._id} />
              </h4>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default Categorypage;
