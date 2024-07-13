"use client";

import Modal from "@/components/Modal";
import Image from "next/image";
import React, { useState } from "react";
import { changeStatus } from "./change-status";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { validatedTag } from "@/helpers/validated-tag";
import { getStatusColor } from "@/helpers/getcolor";

const Orders = ({ orders }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderStatus, setOrderStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [orderInfo, setOrderInfo] = useState({
    _id: "",
    status: "",
  });

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
    setOrderInfo({
      _id: order?._id,
      status: order?.status,
    });
  };

  const handleStatusChange = async () => {
    try {
      setLoading(true);
      const result = await changeStatus({
        id: orderInfo._id,
        status: orderStatus,
        uid: session?.user?.id,
      });
      setLoading(false);
      if (result?.error) {
        toast.error(result?.error, {
          position: "top-right",
          style: {
            borderRadius: "10px",
            background: "#fff",
            color: "red",
          },
        });
      }

      if (result?.result) {
        validatedTag("cart");
        router.refresh();
        toast.success("Update Successfull", {
          position: "top-right",
          style: {
            borderRadius: "10px",
            background: "#fff",
            color: "green",
          },
        });
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
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
        <div className="w-full max-sm:overflow-x-scroll">
          <table className="max-sm:overflow-x-scroll w-full">
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
                    <span
                      className={`px-2 text-sm ${getStatusColor(
                        order?.status
                      )} rounded py-[2px] shadow text-gray-950`}
                    >
                      {order?.status}
                    </span>
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
          <div className="my-2 flex flex-col gap-1">
            <h4 className="">
              Status :
              <span
                className={`px-2 text-sm ${getStatusColor(
                  orderInfo?.status
                )} rounded py-[2px] shadow text-gray-950`}
              >
                {orderInfo?.status}
              </span>
            </h4>
            {orderInfo?.status == "pending" && (
              <div className="flex gap-1">
                <select
                  value={orderStatus}
                  onChange={(e) => setOrderStatus(e.target.value)}
                  className="w-full border p-2"
                >
                  <option value={""}>--- Change ---</option>
                  <option value="cancelled">Cancel</option>
                </select>
                <button
                  onClick={handleStatusChange}
                  disabled={loading}
                  className="text-xs btn"
                >
                  {loading ? (
                    <AiOutlineLoading3Quarters className="animate-spin" />
                  ) : (
                    "Change"
                  )}
                </button>
              </div>
            )}
          </div>
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
