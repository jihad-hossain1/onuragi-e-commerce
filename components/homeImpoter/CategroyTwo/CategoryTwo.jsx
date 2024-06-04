import SingleProduct from "@/components/products/SingleProduct";
import Container from "@/components/ui/container";
import Image from "next/image";
import React from "react";
import { fetchProducts } from "@/utils/products/fetchProducts";
import { fetchPosters } from "@/utils/poster/fetchPosters";

const CategoryTwo = async () => {
  const products = await fetchProducts();
  const posters = await fetchPosters();
  const poster = posters?.[1];
  return (
    <Container>
      <div className="grid md:grid-cols-2 gap-4 lg:gap-6 mt-14">
        <div>
          <h4 className="text-xl font-bold border-b border-gray-400 pb-3">
            For Him
          </h4>

          <div className="mt-4 grid grid-cols-2 lg:grid-cols-3 gap-4">
            {products?.map((product, index) => (
              <SingleProduct key={index} product={product} />
            ))}
          </div>
        </div>
        <div>
          <Image
            src={poster?.image}
            alt={poster?.title}
            height={400}
            width={800}
            className="w-full rounded h-full"
          />
        </div>
      </div>
    </Container>
  );
};

export default CategoryTwo;
