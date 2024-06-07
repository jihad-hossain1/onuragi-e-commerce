import React from "react";
import Topbar from "./topbar/Topbar";
import { fetchProducts } from "@/utils/products/fetchProducts";
import { AnimatedNavbar } from "./AnimatedNavbar";
import { fetchCart } from "@/utils/cart/fetchCart";
import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";

const Navbar = async () => {
  const products = await fetchProducts();
  const data = products.slice(0, 4);

  const session = await getServerSession(options)
  const userId = session?.user?.id;

  let userCart;
  if (userId) {
    userCart = await fetchCart(userId);
  }

  return (
    <div>
      <AnimatedNavbar products={data} carts={userCart?.result} />
    </div>
  );
};

export default Navbar;
