"use client";

import SingleProduct from "@/components/products/SingleProduct";
import Container from "@/components/ui/container";
import Image from "next/image";
import React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import Product from "@/components/products/Product";

const CategoryOne = () => {
  const [products, setProducts] = React.useState([]);
  const [posters, setPosters] = React.useState([]);

  React.useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/v1/products");
      const data = await res.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  React.useEffect(() => {
    const fetchPosters = async () => {
      const res = await fetch("/api/v1/banner/poster");
      const data = await res.json();
      setPosters(data);
    };

    fetchPosters();
  }, []);

  useGSAP(() => {
    gsap.fromTo(
      ".categoryOne",
      {
        opacity: 0,
        duration: 1,
        x: -16,
        y: -26,
        // ease: "power3.inOut",
        // stagger: 0.1,
      },
      {
        opacity: 1,
        // x: 0,
        // y: 0,
        stagger: 0.1,
        duration: 2,
        ease: "power1.inOut",
        // delay: 1,
      }
    );
  }, [products]);

  const poster = posters?.[0];
  const poster2 = posters?.[1];

  const filterProducts = [...products]?.splice(0, 6);

  return (
    <Container>
      <div className="grid md:grid-cols-2 gap-4 lg:gap-6">
        <div className="grid gap-4 items-center  md:py-8 max-sm:ml-5 max-sm:mt-12 px-3">
          <Link href={`/products/${undefined}=${poster?.productId}`}>
            <Image
              src={poster?.image}
              alt={poster?.title}
              height={400}
              width={800}
              className="categoryOne lg:w-[500px] lg:h-[500px] "
            />
          </Link>
          <Link href={`/products/${undefined}=${poster2?.productId}`}>
            <Image
              src={poster2?.image}
              alt={poster2?.title}
              height={400}
              width={800}
              className="categoryOne lg:w-[500px] lg:h-[500px] "
            />
          </Link>
        </div>
        <div>
          <h4 className="text-xl font-bold border-b border-gray-400 pb-3">
            For Baby
          </h4>

          <div className="mt-4 grid grid-cols-2 lg:grid-cols-2 gap-4">
            {filterProducts?.map((product, index) => (
              <Product key={index} product={product} />
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CategoryOne;
