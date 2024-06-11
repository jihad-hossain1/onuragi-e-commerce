import Image from "next/image";
import React from "react";
import AddToCart from "./addToCart";

const SingleProduct = ({ product }) => {
  return (
    <div className="group border border-gray-100 rounded-md shadow-sm hover:shadow p-4">
      <a href={`/products/${product?.slug + `=${product?._id}`}`}>
        <Image
          alt="product iamge"
          height={300}
          width={400}
          className="rounded lg:max-h-[300px]"
          src={product?.image}
        />
      </a>
      <h4>{product?.name}</h4>
      <div>
        <h4 className="">
          <span className="">{`${product?.price}.00`}</span>
          <span className="text-xs ml-1">tk.</span>
        </h4>
        <div className="flex justify-center">
          <AddToCart id={product?._id} />
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
