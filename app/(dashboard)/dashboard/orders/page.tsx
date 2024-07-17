"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

const OrdersPage = () => {
  const [orders, setOrders] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(12);
  const [limit, setLimit] = React.useState(10);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [to, setTo] = React.useState("");
  const [from, setFrom] = React.useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(
        `/api/v1/orders?page=${page}&to=${to}&from=${from}&pageSize=${pageSize}&searchTerm=${searchTerm}&limit=${limit}&sortBy=createdAt&sortOrder=desc`
      );
      const data = await res.json();
      setOrders(data?.data);
    };

    fetchProducts();
  }, [from, limit, page, pageSize, searchTerm, to]);

  return (
    <div className="container mx-auto px-2">
      OrdersPage
      <div className="flex justify-between ">
        <input
          className="max-sm:w-11/12 md:w-1/3 p-2 border border-pink-300 focus:outline-none"
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div>
          <input
            type="date"
            name=""
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            id=""
          />
          <input
            type="date"
            name=""
            value={to}
            onChange={(e) => setTo(e.target.value)}
            id=""
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr className="text-nowrap">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payment Method
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                TrnId
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Products
              </th>

              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>

              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order At
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders?.map((delivery, index: number) => (
              <tr
                key={delivery?._id}
                className="bg-gray-200/5 hover:bg-gray-100 transition duration-500"
              >
                <td className="px-6 py-4 whitespace-nowrap">{delivery?.did}</td>
                <td className="px-6 py-4  flex flex-col gap-2">
                  {delivery?.payInfo?.method}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {delivery?.payInfo?.tid}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {delivery?.products?.length}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  {delivery?.status}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(delivery?.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {delivery?.totalPrice} tk.
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link
                    href={`/dashboard/orders/${delivery?._id}`}
                    className="text-xs border px-2 rounded shadow-sm hover:bg-pink-500 hover:text-white"
                  >
                    Manage
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* pagination button  */}
      <section className="flex justify-end ">
        {/* list of page  */}
        <div className="flex gap-2 md:flex-row flex-col">
          <select
            className="border px-10 py-2 rounded border-gray-200 "
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            <option value={""} disabled>
              Show Products
            </option>
            {[12, 24, 36].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className=" border border-gray-200  py-2 rounded shadow hover:shadow-md transition-all duration-300  px-4 text-center"
          >
            Previous
          </button>
          {/* show current page number  */}
          <h4 className="border border-gray-200  py-2 rounded shadow hover:shadow-md transition-all duration-300  px-4 text-center">
            {page}
          </h4>

          <button
            disabled={orders?.length < pageSize}
            onClick={() => setPage(page + 1)}
            className=" border border-gray-200  py-2 rounded shadow hover:shadow-md transition-all duration-300  px-4 text-center"
          >
            Next
          </button>
        </div>
      </section>
    </div>
  );
};

export default OrdersPage;
