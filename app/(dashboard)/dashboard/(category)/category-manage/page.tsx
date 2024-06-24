"use client";

import UpdateCat from "@/components/Dashboard/Category/updateCat";
import React from "react";
import AddCategory from "@/components/Dashboard/Category/AddCategory";

const Categorypage = () => {
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
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-lg font-semibold">
          Total Categories: {categories?.length || 0}
        </h4>
        <AddCategory />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border-b">#</th>
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {categories?.map((category, index) => (
              <tr key={category?._id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b text-center">{index + 1}</td>
                <td className="px-4 py-2 border-b text-center">
                  {category?.name}
                </td>
                <td className="px-4 py-2 border-b text-center">
                  <UpdateCat name={category?.name} _id={category?._id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Categorypage;
