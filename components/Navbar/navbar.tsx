import React from "react";
import Topbar from "./topbar/Topbar";
import { fetchProducts } from "@/utils/products/fetchProducts";
import { AnimatedNavbar } from "./AnimatedNavbar";

const Navbar = async () => {
  const products = await fetchProducts();
  const data = products.slice(0, 4);
  return (
    <div>
      <AnimatedNavbar products={data} />
    </div>
  );
};

export default Navbar;
