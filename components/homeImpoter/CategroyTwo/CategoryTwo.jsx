"use client";

import SingleProduct from "@/components/products/SingleProduct";
import Container from "@/components/ui/container";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CategoryTwo = () => {
  const [products, setProducts] = React.useState([]);
  const [posters, setPosters] = React.useState([]);

  React.useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/v1/products");
      const data = await res.json();
      setProducts(data);
    };
    const fetchPosters = async () => {
      const res = await fetch("/api/v1/banner/poster");
      const data = await res.json();
      setPosters(data);
    };

    fetchProducts();
    fetchPosters();
  }, []);
  const poster3 = posters?.[2];
  const poster4 = posters?.[3];
  return (
    <Container>
      <div className="grid md:grid-cols-2 gap-4 lg:gap-6 mt-14">
        <div>
          <h4 className="text-xl font-bold border-b border-gray-400 pb-3">
            For Him
          </h4>

          <div className="mt-4 grid grid-cols-2 lg:grid-cols-2 gap-4">
            {products?.slice(0, 6)?.map((product, index) => (
              <SingleProduct key={index} product={product} />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3 py-8">
          <Link href={`/products/${undefined}=${poster3?.productId}`}>
            <Image
              src={poster3?.image}
              alt={poster3?.title}
              height={400}
              width={800}
              className="w-full rounded lg:h-[500px] border shadow"
            />
          </Link>
          <Link href={`/products/${undefined}=${poster4?.productId}`}>
            <Image
              src={poster4?.image}
              alt={poster4?.title}
              height={400}
              width={800}
              className="w-full rounded lg:h-[500px] border shadow"
            />
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default CategoryTwo;
