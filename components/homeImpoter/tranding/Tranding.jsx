import React from "react";
import TrandSingleProduct from "./TrandSingleProduct";
import Container from "@/components/ui/container";
import { fetchProducts } from "@/utils/products/fetchProducts";

const Tranding = async () => {
  const products = await fetchProducts();
  return (
    <Container>
      <main className="grid md:grid-cols-2 lg:flex lg:flex-row  lg:justify-between gap-3">
        {/* top rated  */}
        <div>
          <h4 className="font-semibold text-2xl my-3">Top Rated</h4>
          <div className="flex flex-col gap-4">
            {products?.slice(0, 3)?.map((product) => (
              <TrandSingleProduct key={product?._id} product={product} />
            ))}
          </div>
        </div>
        {/* Best Selling  */}
        <div>
          <h4 className="font-semibold text-2xl my-3">Best Selling</h4>
          <div className="flex flex-col gap-4">
            {products?.slice(0, 3)?.map((product) => (
              <TrandSingleProduct key={product?._id} product={product} />
            ))}
          </div>
        </div>
        {/* On Sale  */}
        <div>
          <h4 className="font-semibold text-2xl my-3">On Sale</h4>
          <div className="flex flex-col gap-4">
            {products?.slice(0, 3)?.map((product) => (
              <TrandSingleProduct key={product?._id} product={product} />
            ))}
          </div>
        </div>
      </main>
    </Container>
  );
};

export default Tranding;
