"use client";

import { useRouter } from "next/navigation";
import React from "react";

const BannerLink = ({ id }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/products/${id}`);
  };
  return (
    <div>
      <button
        onClick={handleClick}
        className="uppercase text-sm md:text-xl  hover:border-yellow-600 bg-pink-600 btn"
      >
        shop now
      </button>
    </div>
  );
};

export default BannerLink;
