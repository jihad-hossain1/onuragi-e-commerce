"use client";

import Modal from "@/components/Modal";
import Image from "next/image";
import React, { useState } from "react";

const Orders = ({ orders }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const getProducts = (order) => {
    return order?.products?.map((product) => {
      const detail = order?.details.find(
        (detail) => detail._id === product.product
      );
      return {
        quantity: product?.quantity,
        price: detail?.price,
        name: detail?.name,
        image: detail?.image,
      };
    });
  };

  const handleManageClick = (order) => {
    setSelectedOrder(order);
  };

  return (
    <section className="lg:col-span-3">
      <div className="bg-gray-100/20 border border-gray-300 shadow-sm p-4 flex flex-col gap-4">
        <h4 className="text-center font-semibold underline">Order Info.</h4>
        <h4 className="flex items-center gap-2 text-sm">
          <span className="font-semibold">Total Order : </span>
          <span>{orders?.length || "no data."}</span>
        </h4>
      </div>

      {/* order list */}
      {orders?.length > 0 ? (
        <div className="w-full overflow-x-scroll">
          <table className="overflow-x-scroll">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b">No.</th>
                <th className="px-4 py-2 border-b">Order Id</th>
                <th className="px-4 py-2 border-b">Date</th>
                <th className="px-4 py-2 border-b">Quantity</th>
                <th className="px-4 py-2 border-b">Status</th>
                <th className="px-4 py-2 border-b">Total</th>
                <th className="px-4 py-2 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order, index) => (
                <tr key={order?._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b text-center">
                    {index + 1}
                  </td>
                  <td className="px-4 py-2 border-b">{order?.did}</td>
                  <td className="px-4 py-2 border-b text-center">
                    {new Date(order?.ztime).toLocaleDateString("en-US")}
                  </td>
                  <td className="px-4 py-2 border-b text-center">
                    {order?.products?.reduce(
                      (acc, pre) => acc + pre.quantity,
                      0
                    )}
                  </td>
                  <td className="px-4 py-2 border-b text-center">
                    {order?.status}
                  </td>
                  <td className="px-4 py-2 border-b text-center">
                    {order?.details?.reduce((acc, pre) => acc + pre.price, 0)}
                  </td>
                  <td className="px-4 py-2 border-b text-center">
                    <button
                      onClick={() => handleManageClick(order)}
                      className="border border-gray-300 px-2 py-1 text-xs bg-slate-300 rounded-md"
                    >
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-[70svh]">
          <div className="flex flex-col gap-3 items-center">
            <h4 className="text-2xl font-semibold">No order found.</h4>
            <a href={"/products"} className="btn text-xs">
              Go to shop
            </a>
          </div>
        </div>
      )}

      {selectedOrder && (
        <Modal
          title={"Order Details"}
          open={!!selectedOrder}
          setOpen={setSelectedOrder}
          maxWidth={undefined}
        >
          <div className="flex flex-col gap-3">
            {getProducts(selectedOrder)?.map((product) => (
              <div
                key={product?.name}
                className="flex justify-between items-center gap-3 border p-3"
              >
                <h4>{product?.name?.slice(0, 20)}</h4>
                <h4>{product?.price}</h4>
                <h4>{product?.quantity}</h4>
                <Image
                  width={100}
                  height={100}
                  src={product?.image}
                  alt={product?.name}
                  className="w-20 h-20 object-cover rounded-md"
                />
              </div>
            ))}
          </div>
        </Modal>
      )}
    </section>
  );
};

export default Orders;
