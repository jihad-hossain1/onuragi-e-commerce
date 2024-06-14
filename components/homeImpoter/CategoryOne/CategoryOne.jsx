"use client";

import SingleProduct from "@/components/products/SingleProduct";
import Container from "@/components/ui/container";
import Image from "next/image";
import React from "react";

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

  const poster = posters?.[0];
  const poster2 = posters?.[1];

  const filterProducts = [...products].splice(0, 6);

  return (
    <Container>
      <div className="grid md:grid-cols-2 gap-4 lg:gap-6">
        <div className="flex flex-col gap-3 py-8">
          <Image
            src={poster?.image}
            alt={poster?.title}
            height={400}
            width={800}
            className="w-full rounded lg:h-[500px] border shadow"
          />
          <Image
            src={poster2?.image}
            alt={poster2?.title}
            height={400}
            width={800}
            className="w-full rounded lg:h-[500px] border shadow"
          />
        </div>
        <div>
          <h4 className="text-xl font-bold border-b border-gray-400 pb-3">
            For Baby
          </h4>

          <div className="mt-4 grid grid-cols-2 lg:grid-cols-2 gap-4">
            {filterProducts?.map((product, index) => (
              <SingleProduct key={index} product={product} />
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CategoryOne;
