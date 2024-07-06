'use client'

import React, { useState } from "react";
import { toast } from "sonner";
import { payserver } from "./payserver";
import { useRouter } from "next/navigation";
import { validatedTag } from "@/helpers/validated-tag";

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
  const address = profileInfo?.address;
  const dAddress = profileInfo?.deliveryAddress;
  const router = useRouter();

  const [payment, setPayment] = useState({
    tid: "",
    sc: "",
    method: "",
  });

  const handlePayment = async () => {
    if (!userId)
      return toast.error("You are not logged in", {
        position: "top-center",
        duration: 2000,
        style: { background: "red", color: "#fff" },
      });

    if (payment.method === "" || !payment.method) {
      return toast.error("Please select payment method", {
        position: "top-center",
        duration: 2000,
        style: { background: "red", color: "#fff" },
      });
    } else if (payment.tid === "" || !payment.tid) {
      return toast.error("Please enter transaction id", {
        position: "top-center",
        duration: 2000,
        style: { background: "red", color: "#fff" },
      });
    }

    try {
      setLoading(true);
      const response = await payserver({ userId, payment });
      setLoading(false);
      console.log(response);

      if (response.error) {
        toast.error(response.error, {
          position: "top-center",
          duration: 2000,
          style: { background: "red", color: "#fff" },
        });
      }

      if (response.result) {
        validatedTag("cart");
        router.refresh();
        toast.success("Payment success", {
          position: "top-center",
          duration: 2000,
          style: { background: "green", color: "#fff" },
        });
        router.push("/customer-dashboard/user-profile");
      }
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
        <div className="my-4 relative">
          <div className="text-white absolute rounded shadow-sm top-0 right-0 w-fit bg-green-400 px-4 text-xl">
            Pay {total} Tk
          </div>
          <div className="flex flex-grow gap-2">
            <select
              name=""
              id=""
              onChange={(e) =>
                setPayment({ ...payment, method: e.target.value })
              }
              className="p-2 border"
            >
              <option value="">----Select Payment Method-----</option>
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
              <div>
                <label htmlFor="input">Or Send a Screenshot</label>
                <input
                  onChange={(e) =>
                    setPayment({ ...payment, sc: e.target.value })
                  }
                  type="file"
                  accept="image/*"
                  maxLength={1}
                  id="input"
                  className="input"
                  placeholder="Transaction Id"
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