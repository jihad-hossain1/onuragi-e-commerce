'use client'

import React, { useRef, useState } from "react";
import { toast } from "sonner";
import { payserver } from "./payserver";
import { useRouter } from "next/navigation";
import { validatedTag } from "@/helpers/validated-tag";
import Image from "next/image";
import axios from "axios";

const Payment = ({
  userId,
  profileInfo = {},
  total,
}: {
  userId: string;
  profileInfo: any;
  total: number;
}) => {
  const [loading, setLoading] = useState(false);
  const dAddress = profileInfo?.deliveryAddress;
  const router = useRouter();
  const [showName, setShowName] = useState<any>();
  const [showImagePreview, setShowImagePreview] = useState<any>();
  const fileInputRef = useRef<HTMLInputElement>();

  const [payment, setPayment] = useState({
    tid: "",
    sc: "",
    method: "",
  });

  const fileUpload = async (fdata: any) => {
    try {
      let data = new FormData();
      data.append("file", fdata);
      data.append("upload_preset", "images_preset");

      let api = `https://api.cloudinary.com/v1_1/dqfi9zw3e/image/upload`;
      const res = await axios.post(api, data);
      let _up = await res?.data?.secure_url;

      return _up;
    } catch (error) {
      console.error(error);
    }
  };

  const handlePayment = async () => {
    if (!userId)
      return toast.error("You are not logged in", {
        position: "top-center",
        duration: 2000,
        style: {
          background: "#fff",
          color: "red",
          padding: "10px",
          borderRadius: "10px",
        },
      });

    if (payment.method === "" || !payment.method) {
      return toast.error("Please select payment method", {
        position: "top-center",
        duration: 2000,
        style: {
          background: "#fff",
          color: "red",
          padding: "10px",
          borderRadius: "10px",
        },
      });
    } else if (payment.tid === "" || !payment.tid) {
      return toast.error("Please enter transaction id", {
        position: "top-center",
        duration: 2000,
        style: {
          background: "#fff",
          color: "red",
          padding: "10px",
          borderRadius: "10px",
        },
      });
    }

    try {
      setLoading(true);
      const image = await fileUpload(showName);
      payment.sc = image;

      const response = await payserver({ userId, payment });
      setLoading(false);

      if (response.error) {
        toast.error(response.error, {
          position: "top-center",
          duration: 2000,
          style: {
            background: "#fff",
            color: "red",
            padding: "10px",
            borderRadius: "10px",
          },
        });
      }

      if (response.result) {
        validatedTag("cart");
        router.refresh();
        toast.success("Payment success", {
          position: "top-center",
          duration: 2000,
          style: {
            background: "#fff",
            color: "green",
            padding: "10px",
            borderRadius: "10px",
          },
        });
        router.push("/customer-dashboard/user-profile");
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const handleClearFile = () => {
    setShowName("");
    setShowImagePreview("");
    fileInputRef.current.value = "";
  };

  return (
    <div>
      {!dAddress ? (
        <div className="flex flex-col justify-center items-center min-h-[40vh]">
          <p className="text-red-500">
            Delivery Address is not set,
            <a
              href="/customer-dashboard/user-profile"
              className="text-blue-500 hover:underline"
            >
              Update it
            </a>
          </p>
        </div>
      ) : (
        <div className="my-4 relative">
         
          <div className="flex max-sm:flex-col flex-row gap-2">
          <div className="text-white md:absolute rounded shadow-sm top-0 right-0 md:w-fit text-center max-sm:text-sm bg-green-400 px-4 md:py-[6px] text-xl">
            Pay {total} Tk
          </div>
          <div className="flex flex-grow gap-2">
            <select
              name=""
              id=""
              onChange={(e) =>
                setPayment({ ...payment, method: e.target.value })
              }
              className="p-2 border w-full"
            >
              <option value="">Select Payment Method</option>
              <option className="" value={"bkash"}>
                Pay with Bkash
              </option>
              <option className="" value={"rocket"}>
                Pay with Rocket
              </option>
              <option className="" value={"nagad"}>
                Pay with Nagad
              </option>
            </select>
          </div>
          </div>
          <div className="py-6">
            <p className="text-center">Please select a payment method</p>
            <div />
            <div className="py-6">
              <div>
                <label htmlFor="input">Give your Transaction Id</label>
                <input
                  value={payment.tid}
                  onChange={(e) =>
                    setPayment({ ...payment, tid: e.target.value })
                  }
                  type="text"
                  id="input"
                  className="input"
                  placeholder="Transaction Id"
                />
              </div>
              <div className="my-4">
                {showName?.name ? (
                  <div className=" mx-auto flex max-w-[600px] items-center gap-x-6  rounded-lg border border-gray-200 p-5 bg-white">
                    <Image
                      width={100}
                      height={100}
                      className="w-full max-w-[150px] rounded-lg object-cover"
                      src={showImagePreview}
                      alt={showName?.name}
                    />
                    <div className="flex-1 space-y-1.5 overflow-hidden">
                      <h5 className="text-xl font-medium tracking-tight truncate">
                        {showName?.name}
                      </h5>
                      <p className="text-gray-500">
                        {(showName.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                    <button onClick={handleClearFile}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                    </button>
                  </div>
                ) : (
                  <label
                    className=" mx-auto flex max-w-[600px] flex-col items-center justify-center space-y-3 rounded-lg border border-gray-200 p-6 bg-white"
                    htmlFor="file5"
                  >
                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <path d="M12 17v-5M12 12l-3-3 3-3 3 3-3 3zM20 16c0-3.31-2.69-6-6-6-1.74 0-3.29.84-4.29 2.17C8.67 10.34 7.25 9 5.5 9C3.01 9 1 11.01 1 13.5S3.01 18 5.5 18h14c1.66 0 3-1.34 3-3z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                    <div className="space-y-1.5 text-center">
                      <h5 className="whitespace-nowrap text-lg font-medium tracking-tight ">
                        You can upload screen shot on payment
                      </h5>
                      <p className="text-sm text-gray-500">
                        File Should be in PNG, JPEG or JPG formate
                      </p>
                    </div>
                  </label>
                )}

                <input
                  ref={fileInputRef}
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      const imageFile = e.target.files[0];
                      setShowName(imageFile);
                      setShowImagePreview(URL.createObjectURL(imageFile));
                    }
                  }}
                  className="hidden"
                  id="file5"
                  type="file"
                />
              </div>
            </div>
            <div className="mt-5">
              <button
                disabled={loading}
                type="button"
                className="btn w-full"
                onClick={handlePayment}
              >
                {loading ? "loading..." : "confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment