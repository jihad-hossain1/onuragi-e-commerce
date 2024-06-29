"use client";

import Image from "next/image";
import React from "react";
import AddToCart from "./addToCart";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const SingleProduct = ({ product }) => {
  useGSAP(() => {
    gsap.fromTo(
      ".textgsap",
      {
        opacity: 0,
        duration: 1,
        x: -16,
        y: -26,
        ease: "back.out",
        stagger: 0.1,
      },
      {
        opacity: 1,
        x: 0,
        y: 0,
        stagger: 0.1,
        duration: 1,
        ease: "back.inOut",
        delay: 0.5,
      }
    );
  }, [product]);
  return (
    <div className="textgsap group border border-gray-100 rounded-sm shadow-sm hover:shadow max-sm:p-1 md:p-4 relative pb-4 ">
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
      <h4 className="pb-4">
        <span className="">{`${product?.price}.00`}</span>
        <span className="text-xs ml-1">tk.</span>
      </h4>
      <div className="absolute bottom-0 right-0">
        <AddToCart id={product?._id} />
      </div>
    </div>
  );
};

export default SingleProduct;
