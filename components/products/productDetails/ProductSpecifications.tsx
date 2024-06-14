'use client'

import React from "react";
interface IProps {
  details: any;
  specification: any;
}

const ProductSpecifications: React.FC<IProps> = ({
  specification,
  details,
}) => {
  // const { sizes, sizeGuide, quantity, about } = details;
  const data = specification;

  return (
    <div className="p-5">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="border-b">
          <nav className="grid md:grid-cols-4 gap-4">
            <button className="flex-1 py-4 px-6 text-center text-gray-600 hover:text-black border-b-2 border-transparent hover:border-indigo-600 focus:outline-none">
              Specifications
            </button>
            <button className="flex-1 py-4 px-6 text-center text-gray-600 hover:text-black border-b-2 border-transparent hover:border-indigo-600 focus:outline-none">
              Details
            </button>
            <button className="flex-1 py-4 px-6 text-center text-gray-600 hover:text-black border-b-2 border-transparent hover:border-indigo-600 focus:outline-none">
              Q&A
            </button>
            <button className="flex-1 py-4 px-6 text-center text-gray-600 hover:text-black border-b-2 border-transparent hover:border-indigo-600 focus:outline-none">
              Review
            </button>
          </nav>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-b">Field</th>
                  <th className="px-4 py-2 border-b">Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border-b">Care</td>
                  <td className="px-4 py-2 border-b">
                    <ul className="list-disc list-inside">
                      {data?.care?.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b">Febric</td>
                  <td className="px-4 py-2 border-b">
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
                  <td className="px-4 py-2 border-b">{data?.valueAddition}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b">Side Cut</td>
                  <td className="px-4 py-2 border-b">{data?.sideCut}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b">Product ID</td>
                  <td className="px-4 py-2 border-b">{data?.productID}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Size Table</h2>
            <table className="min-w-full border-collapse block md:table">
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
            <div className="mt-4">
              <h3 className="text-xl font-bold">Size Guide</h3>
              <p>{details?.sizeGuide}</p>
            </div>
            <div className="mt-4">
              <h3 className="text-xl font-bold">Quantity</h3>
              <p>{details?.quantity}</p>
            </div>
            <div className="mt-4">
              <h3 className="text-xl font-bold">About</h3>
              <p>{details?.about}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Similar Products</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"></div>
      </div>
    </div>
  );
};


export default ProductSpecifications;