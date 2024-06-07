import Image from "next/image";
import React from "react";
import AddToCart from "./addToCart";

const SingleProduct = ({ product }) => {
  return (
    <div className="group">
      <a href={`/products/${product?._id}`}>
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
        <h4 className="block group-hover:hidden">
          <span className="">${product?.price}.00</span>
        </h4>
        <div>
          <AddToCart id={product?._id} />
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
