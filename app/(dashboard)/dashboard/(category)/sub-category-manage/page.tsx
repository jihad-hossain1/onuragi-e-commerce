// "use client";

import React from "react";
import UpdateSub from "@/components/Dashboard/Category/UpdateSub";
import AddSubCategory from "@/components/Dashboard/Category/AddSubCategory";
import { fetchCategories } from "@/utils/categories/fetchCategrories";
import { fetchSubCategories } from "@/utils/sub-categories/fetchSubCategories";

const SubCategorypage = async () => {
  const categories = await fetchCategories();
  const subCategories = await fetchSubCategories();

  return (
    <div className="p-4">
      <div className="mb-4">
        <AddSubCategory categories={categories} />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border-b">#</th>
              <th className="px-4 py-2 border-b">SID</th>
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">CAT</th>
              <th className="px-4 py-2 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {subCategories?.map(
              (category: { _id: string; name: string, sid: string, catName: string }, index: number) => (
                <tr key={category?._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b text-center">
                    {index + 1}
                  </td>
                  <td className="px-4 py-2 border-b text-center">
                    {category?.sid || "N/A"}
                  </td>
                  <td className="px-4 py-2 border-b text-center">
                    {category?.name}
                  </td>
                  <td className="px-4 py-2 border-b text-center">
                    {category?.catName || "N/A"}
                  </td>
                  <td className="px-4 py-2 border-b text-center">
                    <UpdateSub name={category?.name} _id={category?._id} />
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubCategorypage;
