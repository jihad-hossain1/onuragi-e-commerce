"use client";

import { InputFieldCustom } from "@/components/ui/customfield";
import { validatedTag } from "@/helpers/validated-tag";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "sonner";
import { changeOrderStatus } from "./server-action";



const MangeOrder = ({ orderInfo }) => {
  // console.log("🚀 ~ MangeOrder ~ orderInfo:", orderInfo);
  const [myInfo, setMyInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [formStatus, setFormStatus] = useState({
    status: "",
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    deliveryCharge: "",
  });

  const handleStatusChange = async () => {
    try {
      setLoading(true);
      const result = await changeOrderStatus({
        info: {
          ...formData,
        },
        orderId: orderInfo._id,
        status: formStatus?.status,
        uid: orderInfo?.user?._id,
      });
      setLoading(false);
      console.log("🚀 ~ handleStatusChange ~ result:", result);

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
        validatedTag("order");
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

  useEffect(() => {
    if (!myInfo) {
      setFormData({
        name: "Fahmida Haque Esha" || "",
        email: "fahmidaesha58@gmail.com" || "",
        phone: "01777777777" || "",
        street: "Bogura" || "",
        city: "Bogura" || "",
        state: "Bogura Sadar" || "",
        zipCode: "5800" || "",
        deliveryCharge: "150" || "",
      });
    }
  }, [myInfo]);

  useEffect(() => {
    if (orderInfo?.status) {
      setFormStatus({ status: orderInfo?.status || "" });
    }
  }, [orderInfo?.status]);

  function getStatusColor(status: string) {
    switch (status) {
      case "pending":
        return "bg-yellow-100";
      case "delivered":
        return "bg-green-100";
      case "shipped":
        return "bg-blue-100";
      case "returned":
        return "bg-orange-100";
      case "cancelled":
        return "bg-red-100";
      case "failed":
        return "bg-gray-100";
      case "refunded":
        return "bg-purple-100";
      case "processing":
        return "bg-teal-100";
      default:
        return "bg-white";
    }
  }
  return (
    <div>
      <div className="flex justify-center my-3">
        <h1 className="text-3xl font-extrabold">Order Details</h1>
      </div>
      <div className="my-2">
        Order Id: <span className="font-bold">{orderInfo?.did}</span>{" "}
      </div>
      <div className="grid lg:grid-cols-3 gap-3">
        <div className="bg-gray-100 rounded shadow-sm min-h-[100px] p-2 flex flex-col gap-2">
          <h4 className="text-center">Pay Info</h4>
          <h4 className="flex gap-1">
            <span className="font-bold">Method: </span>
            {orderInfo?.payInfo?.method}
          </h4>
          <h4 className="flex gap-1">
            <span className="font-bold">TrnId: </span>
            {orderInfo?.payInfo?.tid}
          </h4>
        </div>
        <div className="bg-gray-100 rounded shadow-sm min-h-[100px] p-2 flex flex-col gap-2">
          <h4 className="text-center">User Info</h4>
          <h4 className="flex gap-1">
            <span className="font-bold">Name: </span>
            {orderInfo?.user?.username}
          </h4>
          <h4 className="flex gap-1">
            <span className="font-bold">Email: </span>
            {orderInfo?.user?.email}
          </h4>
        </div>
        <div className="bg-gray-100 rounded shadow-sm min-h-[100px] p-2 flex flex-col gap-2">
          <h4 className="text-center">Short Info</h4>
          <h4 className="flex gap-1">
            <span className="font-bold">Order At: </span>
            {new Date(orderInfo?.createdAt).toLocaleDateString()}
          </h4>
          <h4 className="flex gap-1">
            <span className="font-bold">Order status: </span>
            <span
              className={`${getStatusColor(
                orderInfo?.status
              )} px-2 shadow-sm rounded`}
            >
              {orderInfo?.status}
            </span>
          </h4>
        </div>
      </div>
      <div className="mt-5 grid lg:grid-cols-2 gap-3 ">
        <div className="bg-gray-100 rounded shadow-sm min-h-[100px] p-2 flex flex-col gap-2">
          <h4 className="text-center">Delivery Address</h4>
          <h4 className="flex gap-1">
            <span className="font-bold">City: </span>
            {orderInfo?.address?.city}
          </h4>
          <h4 className="flex gap-1">
            <span className="font-bold">Street: </span>
            {orderInfo?.address?.street}
          </h4>
          <h4 className="flex gap-1">
            <span className="font-bold">Zip: </span>
            {orderInfo?.address?.zipCode}
          </h4>
        </div>
        <div className="bg-gray-100 rounded shadow-sm min-h-[100px] p-2 flex flex-col gap-2">
          <h4 className="text-center">Your Address</h4>
          <form className="grid lg:grid-cols-2 gap-3">
            <InputFieldCustom
              label={"Name"}
              type={"text"}
              name={"name"}
              id={"name"}
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />

            <InputFieldCustom
              label={"Email"}
              type={"email"}
              name={"email"}
              id={"email"}
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />

            <InputFieldCustom
              label={"Phone"}
              type={"text"}
              name={"phone"}
              id={"phone"}
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />

            <InputFieldCustom
              label={"Street"}
              type={"text"}
              name={"street"}
              id={"street"}
              value={formData.street}
              onChange={(e) =>
                setFormData({ ...formData, street: e.target.value })
              }
            />

            <InputFieldCustom
              label={"City"}
              type={"text"}
              name={"city"}
              id={"city"}
              value={formData.city}
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
            />

            <InputFieldCustom
              label={"ZipCode"}
              type={"text"}
              name={"zipCode"}
              id={"zipCode"}
              value={formData.zipCode}
              onChange={(e) =>
                setFormData({ ...formData, zipCode: e.target.value })
              }
            />
          </form>
        </div>
      </div>

      <div className="mt-5 bg-gray-100 rounded shadow-sm min-h-[100px] p-2 flex flex-col gap-2">
        <h4 className="text-center">Ordered Product</h4>
        <div className="flex flex-col gap-2">
          <table>
            <thead>
              <tr className="border-b bg-slate-300">
                <th className="text-left py-3 px-2">Image</th>
                <th className="text-left py-3 px-2">Name</th>
                <th className="text-left py-3 px-2">Quantity</th>
                <th className="text-left py-3 px-2 flex flex-col">
                  <span>Price</span>
                  <span className="text-[10px]">Per Unit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {orderInfo?.products?.map((product, index) => (
                <tr key={index} className="border-b">
                  <td className="whitespace-nowrap text-left py-2">
                    <Image
                      alt="product"
                      height={50}
                      width={50}
                      src={product?.image}
                      className="rounded w-[50px] h-[50px]"
                    />
                  </td>
                  <td className="whitespace-nowrap text-left py-2">
                    {product?.name}
                  </td>
                  <td className="whitespace-nowrap text-left py-2">
                    {product?.quantity}
                  </td>
                  <td className="whitespace-nowrap text-left py-2">
                    {product?.price}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={3} className="text-right">
                  Total :
                </td>
                <td className="text-left"> {orderInfo?.totalPrice}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <div className="mt-5 bg-gray-100 rounded shadow-sm min-h-[100px] p-2 flex justify-end gap-2">
        <div className="flex flex-col gap-2">
          <div>
            <h4 className="">Status</h4>
            <select
              name="status"
              id="status"
              value={formStatus.status}
              className="border w-full rounded p-2"
              onChange={(e) =>
                setFormStatus({ ...formStatus, status: e.target.value })
              }
            >
              <option value="">--- Change Status ---</option>
              <option value="pending">Pending</option>
              <option value="processing">processing</option>
              <option value="shipped">Shipped</option>
              <option value="returned">returned</option>
              <option value="cancelled">Cancelled</option>
              <option value="failed">Failed</option>
              <option value="refunded">refunded</option>
              <option value="delivered">delivered</option>
            </select>
          </div>
          <div>
            <InputFieldCustom
              label={"Delivery Charge"}
              type={"text"}
              name={"deliveryCharge"}
              id={"deliveryCharge"}
              value={formData.deliveryCharge}
              onChange={(e) =>
                setFormData({ ...formData, deliveryCharge: e.target.value })
              }
            />
          </div>

          <div>Total Price : {orderInfo?.totalPrice}</div>
          <div className="flex justify-end">
            <button
              className="btn text-sm"
              onClick={handleStatusChange}
              disabled={loading}
            >
              {loading ? (
                <AiOutlineLoading3Quarters className="animate-spin" />
              ) : (
                "Update"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MangeOrder;
