"use client";

import Link from "next/link";
import React from "react";
// import { getServerSession } from "next-auth";
// import { options } from "@/app/api/auth/[...nextauth]/options";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { status } = useSession();
  // const session = await getServerSession(options);
  return (
    <div className="flex items-center gap-7">
      <Link href={"/"}>Home</Link>

      {status === "authenticated" ? (
        <button onClick={() => signOut()}>logOut</button>
      ) : (
        <Link href="/login">Login</Link>
      )}
      {/* {session ? (
        <Link href="/api/auth/signout?callbackUrl=/">Logout</Link>
      ) : (
        <Link href="/api/auth/signin">Login</Link>
      )} */}
    </div>
  );
};

export default Navbar;
