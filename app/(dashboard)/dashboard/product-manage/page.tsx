// "use client";

import Products from "@/components/Dashboard/productMange/Products";
import { fetchProducts } from "@/utils/products/fetchProducts";
import { fetchSubCategories } from "@/utils/sub-categories/fetchSubCategories";
// import React, { useState } from "react";

const ProductManagerpage = async () => {
  const products = await fetchProducts();
  const subcategories = await fetchSubCategories();
  // const [products, setProducts] = useState([]);
  // const [subcategories, setSubCategories] = useState([]);

  // React.useEffect(() => {
  //   const fetchProducts = async () => {
  //     const res = await fetch("/api/v1/products", {
  //       next: { tags: ["products"] },
  //     });
  //     const data = await res.json();
  //     setProducts(data);
  //   };

  //   const fetchCategories = async () => {
  //     const res = await fetch("/api/v1/category/subCategory", {
  //       cache: "no-store",
  //     });
  //     const data = await res.json();
  //     setSubCategories(data);
  //   };

  //   fetchCategories();

  //   fetchProducts();
  // }, []);

  return (
    <div>
      <Products products={products} subcategories={subcategories} />
    </div>
  );
};

export default ProductManagerpage;
