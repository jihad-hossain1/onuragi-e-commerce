"use client";

import { useRouter } from "next/navigation";
import React from "react";

const BannerLink = ({ id }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/products/${undefined}=${id}`);
  };
  return (
    <div>
      <button onClick={handleClick} className="uppercase  btn">
        shop now
      </button>
    </div>
  );
};

export default BannerLink;
