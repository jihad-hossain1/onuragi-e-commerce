"use client";

import React from "react";

import { AnimatedNavbar } from "./AnimatedNavbar";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const { data } = useSession();
  const [userCart, setUserCart] = React.useState<any>();
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/v1/products");
      const data = await res.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  React.useEffect(() => {
    const fetchUserCart = async () => {
      const res = await fetch(`/api/v1/users/cart?userId=${data?.user?.id}`);
      const _data = await res.json();
      setUserCart(_data);
    };

    fetchUserCart();
  }, [data?.user?.id]);

  const filterProducts = [...products].splice(0, 4);

  return (
    <div>
      <AnimatedNavbar products={filterProducts} carts={userCart?.result} />
    </div>
  );
};

export default Navbar;
