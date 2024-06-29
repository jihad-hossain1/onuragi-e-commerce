"use client";

import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import Modal from "../Modal";
import Link from "next/link";

const BuyNow = ({
  selectedColor,
  selectedSize,
  cardQuantity,
  currentPrice,
  productId,
}) => {
  const { status } = useSession();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  const handleBuyNow = async () => {
    if (status === "unauthenticated") {
      setOpen(true);
      return;
    }
    // set size,color,quantity,price on local storage
    localStorage.setItem(
      "buyNowInfo",
      JSON.stringify({
        size: selectedSize,
        color: selectedColor,
        quantity: cardQuantity,
        price: currentPrice,
        productId: productId,
      })
    );

    router.push(`/customer-dashboard/cart/buy-now/${productId}`);
    router.refresh();
  };
  return (
    <>
      <button
        onClick={handleBuyNow}
        className="bg-pink-500 text-nowrap w-fit rounded px-6 text-white max-sm:text-xs py-1"
      >
        Buy Now
      </button>

      <Modal
        title={"Authentication"}
        open={open}
        setOpen={setOpen}
        maxWidth={undefined}
      >
        <div className="flex flex-col gap-5">
          <p className="text-red-500 text-center">Please login first</p>
          <Link
            href="/login"
            className="bg-pink-600 text-white w-full py-2 rounded shadow hover:shadow-md transition-all duration-300 hover:bg-pink-700 px-4 text-center"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="bg-pink-600 text-white w-full py-2 rounded shadow hover:shadow-md transition-all duration-300 hover:bg-pink-700 px-4 text-center"
          >
            Register
          </Link>
        </div>
      </Modal>
    </>
  );
};

export default BuyNow;
