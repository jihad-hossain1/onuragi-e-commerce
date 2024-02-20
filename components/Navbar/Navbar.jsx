"use client";

import Link from "next/link";
import Search from "./search/Search";
import ShopingCart from "./shopingCart/ShopingCart";
import UserAccount from "./userAccount/UserAccount";
import { ThemeButton } from "./themeButton/ThemeButton";

const Navbar = () => {
  return (
    <main className="max-w-screen-xl p-1 mx-auto">
      <div className="flex items-center gap-4 justify-between">
        {/* logo section */}
        <section>Onuragi</section>

        {/* navmenu section  */}
        <section className="flex items-center gap-10">
          <Link href={"/"} className="uppercase">
            Home
          </Link>
          <Link href={"/"} className="uppercase">
            Shop
          </Link>
          <Link href={"/"} className="uppercase">
            Product
          </Link>
          <Link href={"/"} className="uppercase">
            Buy
          </Link>
        </section>

        {/* icon section  */}
        <section className="flex items-center gap-4">
          <Search />

          <ShopingCart />

          <UserAccount />

          <ThemeButton />
        </section>
      </div>
    </main>
  );
};

export default Navbar;
