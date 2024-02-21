"use client";

import React, { useState } from "react";
import {
  HoveredLink,
  Menu,
  MenuItem,
  ProductItem,
} from "@/components/ui/navbar-menu";
import { cn } from "@/utils/cn";
import Search from "./search/Search";
import ShopingCart from "./shopingCart/ShopingCart";
import UserAccount from "./userAccount/UserAccount";
import { ThemeButton } from "./themeButton/ThemeButton";
import { SiteLogo } from ".";

export function AnimatedNavbar() {
  return (
    <main className="max-w-screen-xl mx-auto p-2">
      <div className="relative w-full flex items-center justify-between">
        <MobileNav />
        <SiteLogo />
        <Navbar className="top-2" />
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

function Navbar({ className }) {
  const [active, setActive] = useState(null);
  return (
    <div
      className={cn(" max-w-xl mx-auto z-50 lg:block hidden", className)}
      //   className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="SHOP">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/">Handicraft</HoveredLink>
            <HoveredLink href="/">Baby Dress</HoveredLink>
            <HoveredLink href="/">Women</HoveredLink>
            <HoveredLink href="/">Men</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="PRODUCTS">
          <div className="  text-sm grid grid-cols-2 gap-10 p-4">
            <ProductItem
              title="Algochurn"
              href="/"
              src="https://res.cloudinary.com/algochurn/image/upload/v1700109138/framer%20motion%20components/290shots_so_gruelx.png"
              description="Prepare for tech interviews like never before."
            />
            <ProductItem
              title="Tailwind Master Kit"
              href="/"
              src="https://res.cloudinary.com/algochurn/image/upload/v1700109138/framer%20motion%20components/155shots_so_acab66.png"
              description="Production ready Tailwind css components for your next project"
            />
            <ProductItem
              title="Moonbeam"
              href="/"
              src="https://res.cloudinary.com/algochurn/image/upload/v1700109138/framer%20motion%20components/53shots_so_wygjpf.png"
              description="Never write from scratch again. Go from idea to blog in minutes."
            />
            <ProductItem
              title="Rogue"
              href="/"
              src="https://res.cloudinary.com/algochurn/image/upload/v1700109139/framer%20motion%20components/356shots_so_hwpzvs.png"
              description="Respond to government RFPs, RFIs and RFQs 10x faster using AI"
            />
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="BUY">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/hobby">Hobby</HoveredLink>
            <HoveredLink href="/individual">Individual</HoveredLink>
            <HoveredLink href="/team">Team</HoveredLink>
            <HoveredLink href="/enterprise">Enterprise</HoveredLink>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}

