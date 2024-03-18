import Image from "next/image";
import React from "react";

const SingleProduct = ({ product }) => {
  return (
    <div className="group">
      <a href={`/products/${product?._id}`}>
        <Image
          alt="product iamge"
          height={300}
          width={400}
          className="rounded"
          src={product?.image}
        />
      </a>
      <h4>{product?.name}</h4>
      <div>
        <h4 className="block group-hover:hidden">
          <span className="">${product?.price}.00</span>
        </h4>
        <div>
          <button className="hidden group-hover:block hover:text-pink-500 hover:transition-all duration-500 ">
            add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
