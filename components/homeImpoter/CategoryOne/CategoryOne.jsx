"use client";

import Container from "@/components/ui/container";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import Product from "@/components/products/Product";

const Skeleton = ({ className }) => (
  <div className={`animate-pulse bg-gray-300 ${className}`} />
);

const CategoryOne = () => {
  const [products, setProducts] = React.useState([]);
  const [posters, setPosters] = React.useState([]);
  const [loadingProducts, setLoadingProducts] = React.useState(true);
  const [loadingPosters, setLoadingPosters] = React.useState(true);

  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/v1/products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, []);

  React.useEffect(() => {
    const fetchPosters = async () => {
      try {
        const res = await fetch("/api/v1/banner/poster");
        const data = await res.json();
        setPosters(data);
      } catch (error) {
        console.error("Error fetching posters:", error);
      } finally {
        setLoadingPosters(false);
      }
    };

    fetchPosters();
  }, []);


  const filterProducts = products?.slice(0, 6);

  return (
    <Container>
      <div className="grid md:grid-cols-2 gap-4 lg:gap-6 max-sm:mt-6">
        {/* Poster Section */}
        <div className="grid max-sm:grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-4 items-center py-4">
          {loadingPosters
            ? Array.from({ length: 4 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className="w-full h-[200px] md:h-[300px] rounded-md"
                />
              ))
            : posters?.map((poster, index) => (
                <div
                  key={index}
                  className="border group relative w-full h-[200px] md:h-[300px] p-0.5 rounded-md overflow-hidden "
                >
                  <Image
                    src={poster?.image}
                    alt={poster?.title}
                    height={400}
                    width={1000}
                    className=" object-cover w-full h-full rounded-md"
                    placeholder="blur"
                    blurDataURL="/path/to/placeholder.jpg"
                  />

                  {/* Hover "View" Button */}
                  <div className="group-hover:flex hidden absolute inset-0 z-50 bg-black/30 backdrop-blur-sm items-center justify-center">
                    <Link
                      className="text-white px-4 py-2 bg-slate-800/50 border border-pink-400 rounded-md"
                      href={`/products/${poster?.slug}`}
                    >
                      View
                    </Link>
                  </div>
                </div>
              ))}
        </div>

        {/* Product Section */}
        <div>
          <h4 className="text-xl font-bold border-b border-gray-400 pb-3">
            For Baby
          </h4>

          <div className="mt-4 grid max-sm:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {loadingProducts
              ? Array.from({ length: 6 }).map((_, index) => (
                  <Skeleton
                    key={index}
                    className="h-[250px] w-full rounded-md"
                  />
                ))
              : filterProducts?.map((product, index) => (
                  <Product key={index} product={product} />
                ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CategoryOne;
