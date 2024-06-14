"use client";

import Products from "@/components/Dashboard/productMange/Products";
import React, { useState } from "react";

const ProductManagerpage = () => {
  const [products, setProducts] = useState([]);
  const [subcategories, setSubCategories] = useState([]);

  React.useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/v1/products");
      const data = await res.json();
      setProducts(data);
    };

    const fetchCategories = async () => {
      const res = await fetch("/api/v1/category/subCategory");
      const data = await res.json();
      setSubCategories(data);
    };

    fetchCategories();

    fetchProducts();
  }, []);

  return (
    <div>
      <Products products={products} subcategories={subcategories} />
    </div>
  );
};

export default ProductManagerpage;
