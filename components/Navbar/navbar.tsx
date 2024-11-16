import React from "react";
import { AnimatedNavbar } from "./AnimatedNavbar";
import { fetchCart } from "../../utils/cart/fetchCart";
import { serverAuth } from "@/hooks/serverAuth";

const Navbar = async () => {
  const authUser: any = await serverAuth();

  let initialCarts;
  if (authUser) {
    initialCarts = await fetchCart(authUser?.user?.id);
  }

  return (
    <div>
      <AnimatedNavbar carts={initialCarts?.result} />
    </div>
  );
};

export default Navbar;
