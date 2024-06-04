import SingleProduct from "@/components/products/SingleProduct";
import Container from "@/components/ui/container";
import Image from "next/image";
import React from "react";
import { fetchProducts } from "@/utils/products/fetchProducts";
import { fetchPosters } from "@/utils/poster/fetchPosters";

const CategoryTwo = async () => {
  const products = await fetchProducts();
  const posters = await fetchPosters();
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
        <div className="flex flex-col gap-3">
          <Image
            src={poster3?.image}
            alt={poster3?.title}
            height={400}
            width={800}
            className="w-full rounded lg:h-[400px] border shadow"
          />
          <Image
            src={poster4?.image}
            alt={poster4?.title}
            height={400}
            width={800}
            className="w-full rounded lg:h-[400px] border shadow"
          />
        </div>
      </div>
    </Container>
  );
};

export default CategoryTwo;
