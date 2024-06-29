'use client'

import React, { useState } from "react";
import ProductQuestion from "./question/ProductQuestion";
import ProductReview from "./review/ProductReview";
interface IProps {
  details: any;
  specification: any;
  product: any;
  questions: any;
  reviews: any;
}

const ProductSpecifications: React.FC<IProps> = ({
  specification,
  details,
  product,
  questions,
  reviews,
}) => {
  const [tabIndex, setTabIndex] = useState(1);

  const sections = [
    {
      title: "Details",
      id: 1,
    },
    {
      title: " Q&A",
      id: 2,
    },
    {
      title: "Review",
      id: 3,
    },
  ];

  const data = specification;

  return (
    <div className=" mt-5 lg:mt-0 lg:p-5">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="border-b">
          <nav className="grid md:grid-cols-4 gap-4">
            {sections.map((item) => (
              <button
                onClick={() => setTabIndex(item?.id)}
                key={item?.id}
                className={`flex-1 py-4 px-6 text-center text-gray-600 hover:text-black border-b-2  ${
                  tabIndex == item.id ? "border-pink-600" : ""
                } focus:outline-none`}
              >
                {item?.title}
              </button>
            ))}
          </nav>
        </div>
        <div className="lg:p-6">
          <div className={tabIndex == 1 ? "block" : "hidden"}>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr>
                    <th className="py-2 border-b">Field</th>
                    <th className=" py-2 border-b">Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-2 border-b">Care</td>
                    <td className="px-4 py-2 border-b text-sm">
                      {data?.care?.length > 0 ? data?.care?.join(", ") : "N/A"}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border-b">Febric</td>
                    <td className="px-4 py-2 border-b text-sm">
                      {data?.febric?.length > 0
                        ? data?.febric?.join(", ")
                        : "N/A"}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border-b">Sleeve</td>
                    <td className="px-4 py-2 border-b">{data?.sleeve}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border-b">Value Addition</td>
                    <td className="px-4 py-2 border-b">
                      {data?.valueAddition || "N/A"}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border-b">Side Cut</td>
                    <td className="px-4 py-2 border-b">
                      {data?.sideCut || "N/A"}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border-b">Product ID</td>
                    <td className="px-4 py-2 border-b">
                      {product?.PID || "N/A"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="lg:p-4 overflow-auto">
              <h2 className="text-2xl font-semibold mb-4">Stock With Size</h2>
              {details?.sizes?.length > 0 ? (
                <table className="overflow-x-auto min-w-full border-collapse block md:table">
                  <thead className="block md:table-header-group">
                    <tr className="border border-gray-300 md:border-none block md:table-row">
                      <th className="bg-gray-200 p-2 text-gray-600 font-bold md:border md:border-gray-300 text-center block md:table-cell">
                        Size
                      </th>
                      <th className="bg-gray-200 p-2 text-gray-600 font-bold md:border md:border-gray-300 text-center block md:table-cell">
                        Price
                      </th>
                      <th className="bg-gray-200 p-2 text-gray-600 font-bold md:border md:border-gray-300 text-center block md:table-cell">
                        Stock Quantity
                      </th>
                    </tr>
                  </thead>
                  <tbody className="block md:table-row-group">
                    {details?.sizes?.map((size, index) => (
                      <tr
                        key={index}
                        className="bg-white border border-gray-300 md:border-none block md:table-row"
                      >
                        <td className="p-2 md:border md:border-gray-300 text-center block md:table-cell">
                          {size?.size}
                        </td>
                        <td className="p-2 md:border md:border-gray-300 text-center block md:table-cell">
                          {size?.price}
                        </td>
                        <td className="p-2 md:border md:border-gray-300 text-center block md:table-cell">
                          {size?.quantity}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                "N/A"
              )}

              <div className="mt-4">
                <h3 className="text-xl font-semibold">Overall Stock</h3>
                <p>{details?.quantity || "N/A"}</p>
              </div>
              <div className="mt-4">
                <h3 className="text-xl font-semibold">Size Guide</h3>
                <p>{details?.sizeGuide || "N/A"}</p>
              </div>

              <div className="mt-4">
                <h3 className="text-xl font-semibold">About</h3>
                <p>{details?.about || "N/A"}</p>
              </div>
            </div>
          </div>
          <div className={tabIndex == 2 ? "block" : "hidden"}>
            <h4 className="text-center py-3">Questions</h4>
            <ProductQuestion productId={product?._id} questions={questions} />
          </div>
          <div className={tabIndex == 3 ? "block" : "hidden"}>
            <h4 className="text-center py-3">Reviews</h4>
            <ProductReview productId={product?._id} reviews={reviews} />
          </div>
        </div>
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Similar Products</h2>
        {product?.smilerProducts?.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"></div>
        ) : (
          "N/A"
        )}
      </div>
    </div>
  );
};


export default ProductSpecifications;