"use client";

import React from "react";
import UpdateSub from "@/components/Dashboard/Category/UpdateSub";
import AddSubCategory from "@/components/Dashboard/Category/AddSubCategory";

const SubCategorypage = () => {
  const [subCategories, setsubCategories] = React.useState([]);
  const [categories, setCategories] = React.useState([]);

  React.useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch(`/api/v1/category`);
      const result = await res.json();
      setCategories(result);
    };
    fetchCategories();
  }, []);

  React.useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch(`/api/v1/category/subCategory`);
      const result = await res.json();
      setsubCategories(result);
    };
    fetchCategories();
  }, []);
  return (
    <>
      <AddSubCategory categories={categories} />
      <div className="flex flex-col gap-3">
        {subCategories?.map(
          (category: { name: string; _id: string }, _ind: number) => (
            <h4 key={category?._id} className="flex items-center gap-2">
              <span>{_ind + 1}.</span>
              <span>{category?.name}</span>
              <UpdateSub name={category?.name} _id={category?._id} />
            </h4>
          )
        )}
      </div>
    </>
  );
};

export default SubCategorypage;
