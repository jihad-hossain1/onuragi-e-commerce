"use client";

import Link from "next/link";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import { SlMagnifier } from "react-icons/sl";
import { HiOutlineShoppingBag, HiOutlineUserCircle } from "react-icons/hi2";

const Navbar = () => {
  const { status } = useSession();

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
        <section>
          <button>
            <SlMagnifier />
          </button>

          <button>
            <HiOutlineShoppingBag />
          </button>
          <button>
            <HiOutlineUserCircle />
          </button>
          {status === "authenticated" ? (
            <button onClick={() => signOut()}>logOut</button>
          ) : (
            <Link href="/login">Login</Link>
          )}
        </section>
      </div>
    </main>
  );
};

export default Navbar;
