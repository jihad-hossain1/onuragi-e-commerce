"use client";

import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "../ui/navbar-menu";
import { cn } from "@/utils/cn";
import Search from "./search/Search";
import ShopingCart from "./shopingCart/ShopingCart";
import UserAccount from "./userAccount/UserAccount";
import { ThemeButton } from "./themeButton/ThemeButton";
import { SiteLogo } from ".";
import Link from "next/link";

export function AnimatedNavbar({ products }) {
  return (
    <main className="max-w-screen-xl mx-auto p-2">
      <div className="relative w-full flex items-center justify-between">
        <MobileNav />
        <SiteLogo />
        <Navbar products={products} className="top-2" />
        <section className="flex items-center gap-4">
          <Search />

          <ShopingCart />

          <UserAccount />

          <ThemeButton />
        </section>
      </div>
    </main>
  );
}

function MobileNav() {
  return (
    <div className="lg:hidden">
      <button>x</button>
    </div>
  );
}

function Navbar({ className, products }) {
  const [active, setActive] = useState(null);
  return (
    <div className={cn("max-w-xl mx-auto z-10 lg:block hidden", className)}>
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="SHOP">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/">Handicraft</HoveredLink>
            <HoveredLink href="/">Baby Dress</HoveredLink>
            <HoveredLink href="/">Women</HoveredLink>
            <HoveredLink href="/">Men</HoveredLink>
          </div>
        </MenuItem>
        <Link href="/products">
          <MenuItem setActive={setActive} active={active} item="PRODUCTS">
            <div className="text-sm grid grid-cols-2 gap-10 p-4">
              {products?.map((product) => (
                <ProductItem
                  key={product._id}
                  title={product?.name}
                  href={`/products/${product?._id}`}
                  src={product?.image}
                  description={product?.name}
                />
              ))}
            </div>
          </MenuItem>
        </Link>
        <MenuItem setActive={setActive} active={active} item="BUY">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/products/category">Three Pices</HoveredLink>
            <HoveredLink href="/products/category">Mura</HoveredLink>
            <HoveredLink href="/products/category">Papos</HoveredLink>
            <HoveredLink href="/products/category">Handicraft</HoveredLink>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}

