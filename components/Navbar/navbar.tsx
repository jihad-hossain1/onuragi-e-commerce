import React from "react";
import { AnimatedNavbar } from "./AnimatedNavbar";
import { fetchProducts } from "@/utils/products/fetchProducts";
// import { useProducts } from "@/hooks/productHook";
// import { useCartItems } from "@/hooks/cartsHook";
import { fetchCart } from "../../utils/cart/fetchCart";
import { serverAuth } from "@/hooks/serverAuth";

const Navbar = async () => {
  // const { products } = useProducts();
  // const { cartItems } = useCartItems();
  const authUser: any = await serverAuth();
  const products = await fetchProducts();

  let initialProducts;

  if (products) {
    initialProducts = products;
    initialProducts = [...products]?.splice(0, 4);
  }

  let initialCarts;
  if (authUser) {
    initialCarts = await fetchCart(authUser?.user?.id);
  }

  return (
    <div>
      <AnimatedNavbar products={initialProducts} carts={initialCarts?.result} />
    </div>
  );
};

export default Navbar;
