"use client";

import React from "react";
import UpdateSub from "@/components/Dashboard/Category/UpdateSub";
import AddSubCategory from "@/components/Dashboard/Category/AddSubCategory";

const SubCategorypage = () => {
  const [subCategories, setSubCategories] = React.useState([]);
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
    const fetchSubCategories = async () => {
      const res = await fetch(`/api/v1/category/subCategory`);
      const result = await res.json();
      setSubCategories(result);
    };
    fetchSubCategories();
  }, []);

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
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {subCategories?.map((category, index) => (
              <tr key={category._id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b text-center">{index + 1}</td>
                <td className="px-4 py-2 border-b text-center">{category.name}</td>
                <td className="px-4 py-2 border-b text-center">
                  <UpdateSub name={category.name} _id={category._id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubCategorypage;
// "use client";

// import React from "react";
// import UpdateSub from "@/components/Dashboard/Category/UpdateSub";
// import AddSubCategory from "@/components/Dashboard/Category/AddSubCategory";

// const SubCategorypage = () => {
//   const [subCategories, setSubCategories] = React.useState([]);
//   const [categories, setCategories] = React.useState([]);

//   React.useEffect(() => {
//     const fetchCategories = async () => {
//       const res = await fetch(`/api/v1/category`);
//       const result = await res.json();
//       setCategories(result);
//     };
//     fetchCategories();
//   }, []);

//   React.useEffect(() => {
//     const fetchSubCategories = async () => {
//       const res = await fetch(`/api/v1/category/subCategory`);
//       const result = await res.json();
//       setSubCategories(result);
//     };
//     fetchSubCategories();
//   }, []);

//   return (
//     <div className="p-4">
//       <div className="mb-4">
//         <AddSubCategory categories={categories} />
//       </div>
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-200">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="px-4 py-2 border-b">#</th>
//               <th className="px-4 py-2 border-b">Name</th>
//               <th className="px-4 py-2 border-b">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {subCategories?.map((category, index) => (
//               <tr key={category._id} className="hover:bg-gray-50">
//                 <td className="px-4 py-2 border-b text-center">{index + 1}</td>
//                 <td className="px-4 py-2 border-b">{category.name}</td>
//                 <td className="px-4 py-2 border-b text-center">
//                   <UpdateSub name={category.name} _id={category._id} />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default SubCategorypage;
