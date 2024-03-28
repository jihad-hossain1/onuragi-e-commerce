import Image from "next/image";
import React from "react";

const TrandSingleProduct = ({ product }) => {
  return (
    <div className="group w-fit flex gap-2">
      <a href={`/products/${product?._id}`}>
        <Image
          alt="product iamge"
          height={300}
          width={400}
          className="rounded w-[100px] h-[100px]"
          src={product?.image}
        />
      </a>

      <div className="mt-2">
        <h4>{product?.name?.slice(0, 20)}..</h4>
        <h4 className="">${product?.price}.00</h4>
      </div>
    </div>
  );
};

export default TrandSingleProduct;
