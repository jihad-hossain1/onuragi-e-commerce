
import Image from "next/image";
import React from "react";
import AddToCart from "./addToCart";

const Product = ({ product }) => {
  return (
    <div className="group relative border border-gray-100 rounded-md shadow-sm hover:shadow-lg transition-all duration-300 max-sm:p-1 md:p-4 pb-4 bg-white hover:bg-gray-50">
      {/* Product Link */}
      <a href={`/products/${product?.slug}`} className="block relative overflow-hidden">
        {/* Image with Hover Zoom */}
        <Image
          alt="product image"
          height={300}
          width={400}
          className="rounded-md object-cover w-full h-full lg:max-h-[300px] max-sm:max-h-[200px] transition-transform duration-300 ease-in-out group-hover:scale-105"
          src={product?.image}
        />
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-md">
          <span className="text-white text-sm font-semibold">Quick View</span>
        </div>
      </a>

      {/* Product Info */}
      <h4 className="text-lg  font-semibold mt-2 max-sm:text-[12px] group-hover:text-blue-600 transition-colors duration-300">
        {product?.name?.slice(0, 20)}
      </h4>

      {/* Add to Cart Button */}
      <div className="flex items-center justify-between">
      <h4 className=" text-gray-600">
        <span className="text-lg max-sm:text-[12px] font-bold">{`${product?.price}.00`}</span>
        <span className="text-xs ml-1">tk.</span>
      </h4>
        <AddToCart
          defaultColor={product?.defaultColor}
          defaultSize={product?.defaultSize}
          id={product?._id}
        />
      </div>
    </div>
  );
};

export default Product;
