"use client";

import Container from "@/components/ui/container";
import React from "react";
import Product from "@/components/products/Product";
import { Skeleton } from "@/components/Skeleton";



const CategoryOne = () => {
  const [products, setProducts] = React.useState([]);
  const [loadingProducts, setLoadingProducts] = React.useState(true);

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




  const filterProducts = products?.slice(0, 8);

  return (
    <Container>
      <div className="grid md:grid-cols-2 gap-4 lg:gap-6 max-sm:mt-6">
        {/* Product Section */}
        <div>
          <h4 className="text-xl font-bold border-b border-gray-400 pb-3">
            For Girls
          </h4>

          <div className="mt-4 grid max-sm:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {loadingProducts
              ? Array.from({ length: 8 }).map((_, index) => (
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
