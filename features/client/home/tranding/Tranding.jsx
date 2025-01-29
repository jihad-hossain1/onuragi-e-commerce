"use client";

import React from "react";
import Container from "@/components/ui/container";
import Product from "@/components/products/Product";

const Tranding = () => {
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/v1/products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Container>
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 my-6">
        {/* Top Rated */}
        <div className="bg-white p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl duration-300">
          <h4 className="font-semibold text-xl md:text-2xl mb-4">Top Rated</h4>
          <div className="flex flex-col gap-4">
            {products?.slice(0, 3)?.map((product) => (
              <Product key={product?._id} product={product} />
            ))}
          </div>
        </div>

        {/* Best Selling */}
        <div className="bg-white p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl duration-300">
          <h4 className="font-semibold text-xl md:text-2xl mb-4">Best Selling</h4>
          <div className="flex flex-col gap-4">
            {products?.slice(0, 3)?.map((product) => (
              <Product key={product?._id} product={product} />
            ))}
          </div>
        </div>

        {/* On Sale */}
        <div className="bg-white p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl duration-300">
          <h4 className="font-semibold text-xl md:text-2xl mb-4">On Sale</h4>
          <div className="flex flex-col gap-4">
            {products?.slice(0, 3)?.map((product) => (
              <Product key={product?._id} product={product} />
            ))}
          </div>
        </div>
      </main>
    </Container>
  );
};

export default Tranding;
