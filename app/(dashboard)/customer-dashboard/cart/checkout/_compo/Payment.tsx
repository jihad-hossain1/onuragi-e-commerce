'use client'

import React, { useState } from 'react'
import { serverAction } from './serverAction';
import { toast } from 'sonner';

const Payment = ({
  userId,
  profileInfo = {},
}: {
  userId: string;
  profileInfo: any;
}) => {
  const [loading, setLoading] = useState(false);
  const address = profileInfo?.address;
  const dAddress = profileInfo?.deliveryAddress;

  const handlePayment = async () => {
    if (!userId)
      return toast.error("You are not logged in", {
        position: "top-center",
        duration: 2000,
        style: { background: "red", color: "#fff" },
      });
    try {
      setLoading(true);
      const response = await serverAction({ userId });
      setLoading(false);
      console.log(response);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <div>
      {!dAddress ? (
        <div className="flex flex-col justify-center items-center min-h-[40vh]">
          <p className="text-red-500">
            Delivery Address is not set,{" "}
            <a
              href="/customer-dashboard/user-profile"
              className="text-blue-500 hover:underline"
            >
              Update it
            </a>{" "}
          </p>
        </div>
      ) : (
        <div className="mt-4 ">
          <div className="flex flex-grow gap-2">
            <button className="btn w-fit text-xs">Pay with Card</button>
            <button className="btn w-fit text-xs">Pay with Bkash</button>
            <button className="btn w-fit text-xs">Pay with Rocket</button>
            <button className="btn w-fit text-xs">Pay with Nagad</button>
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
      )}
    </div>
  );
};

export default Payment