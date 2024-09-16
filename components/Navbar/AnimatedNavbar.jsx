"use client";

import React, { useEffect, useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "../ui/navbar-menu";
import { cn } from "@/utils/cn";
import Search from "./search/Search";
import ShopingCart from "./shopingCart/ShopingCart";
import UserAccount from "./userAccount/UserAccount";
import { SiteLogo } from ".";
import Link from "next/link";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross1 } from "react-icons/rx";
import { RxChevronDown, RxChevronUp } from "react-icons/rx";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

export function AnimatedNavbar({ products, carts }) {
  const path = usePathname();
  const paths = ["/login", "/login/register",'/customer-dashboard'];


  const hiddenPath = paths.some((item) => path.startsWith(item));

  return (
    <main
      className={hiddenPath ? "hidden" : "max-w-screen-xl mx-auto"}
    >
      <div className="relative w-full flex items-center justify-between mt-2">
        <MobileNav />
        <SiteLogo />
        <Navbar products={products} className="top-2" />
        <section className="flex items-center gap-4">
          <Search />

          <ShopingCart carts={carts} />

          <UserAccount />

          {/* <ThemeButton /> */}
        </section>
      </div>
    </main>
  );
}

function MobileNav() {
  const [active, setActive] = useState(false);
  const downRef = React.useRef(null);
  const [open, setOpen] = useState(false);
  const { status, data } = useSession();

  const admin = data?.user?.role;

  useEffect(() => {
    const close = (e) => {
      if (downRef.current && !downRef.current.contains(e.target))
        setActive(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);


  return (
    <div className="lg:hidden relative">
      <button onClick={() => setActive(!active)} className="pl-2">
        <RxHamburgerMenu size={22} />
      </button>
      {active && (
        <div
          ref={downRef}
          className="absolute top-0 z-10 h-screen w-[70vw] bg-white  rounded-r-xl overflow-hidden border border-black/[0.2] dark:border-white/[0.2] shadow-xl"
        >
          {/* <MobileMenu /> */}

          <main className="relative">
            <div className="absolute top-3 right-3 z-10 ">
              <button onClick={() => setActive((prev) => !prev)} className="">
                <RxCross1 size={22} />
              </button>
            </div>
            <div className="flex flex-col gap-4 p-10 ">
              <Link href="/">Home</Link>
              <Link href="/products">Products</Link>
              <div>
                <div
                  onClick={() => setOpen((prev) => !prev)}
                  className="flex items-center justify-between cursor-pointer"
                >
                  <button>Account</button>
                  {open ? <RxChevronUp /> : <RxChevronDown />}
                </div>
                {open && (
                  <div className="ml-4 mt-3">
                    {status === "authenticated" ? (
                      <div className="flex flex-col space-y-2">
                        {admin == "admin" && (
                          <Link href={"/dashboard"}>
                            <p>Dashboard</p>
                          </Link>
                        )}
                        <Link href={"/customer-dashboard/user-profile"}>
                          <p>Profile</p>
                        </Link>
                        <Link href={"/customer-dashboard/cart"}>
                          <p>Carts</p>
                        </Link>
                        <p onClick={() => signOut()}>
                          <button>Logout</button>
                        </p>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-3">
                        <p>
                          <a href="/login">Login</a>
                        </p>
                        <p>
                          <a href="/login/register">Register</a>
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      )}
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
                  href={`/products/${product?.slug}=${product?._id}`}
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

