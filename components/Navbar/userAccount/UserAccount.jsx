"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";
import { PiUserCircleLight } from "react-icons/pi";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const UserAccount = () => {
  const { status, data } = useSession();

  const admin = data?.user?.role;

  return (
    <React.Fragment>
      <div className="lg:block hidden">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <PiUserCircleLight className="text-[20px] mt-2 lg:text-[32px]" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {status === "authenticated" ? (
              <div className="flex flex-col space-y-2">
                {admin == "admin" && (
                  <Link href={"/dashboard"}>
                    <DropdownMenuItem>Dashboard</DropdownMenuItem>
                  </Link>
                )}
                <Link href={"/customer-dashboard/user-profile"}>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                </Link>
                <Link href={"/customer-dashboard/cart"}>
                  <DropdownMenuItem>Carts</DropdownMenuItem>
                </Link>
                <DropdownMenuItem onClick={() => signOut()}>
                  <button>Logout</button>
                </DropdownMenuItem>
              </div>
            ) : (
              <>
                <DropdownMenuItem>
                  <a href="/login">Login</a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a href="/login/register">Register</a>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </React.Fragment>
  );
};

export default UserAccount;
