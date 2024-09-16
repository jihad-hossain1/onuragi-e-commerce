"use client";

import Link from "next/link";
import Search from "./search/Search";
import ShopingCart from "./shopingCart/ShopingCart";
import UserAccount from "./userAccount/UserAccount";
import { ThemeButton } from "./themeButton/ThemeButton";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const path = usePathname();
  const paths = ["/login", "/login/register",'/customer-dashboard'];


  const hiddenPath = paths.some((item) => path.startsWith(item));
  return (
    <main className={hiddenPath ? "hidden" : "max-w-screen-xl mx-auto"}>
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
