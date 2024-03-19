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
  const { status, data: session } = useSession();
  return (
    <div className="lg:block hidden">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <PiUserCircleLight className="text-[20px] mt-2 lg:text-[32px]" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {status === "authenticated" ? (
            <>
              {session?.user?.role == "admin" && (
                <Link href={"/dashboard"}>
                  <DropdownMenuItem>Dashboard</DropdownMenuItem>
                </Link>
              )}
              <Link href={"/user-profile"}>
                <DropdownMenuItem>Profile</DropdownMenuItem>
              </Link>
              <DropdownMenuItem onClick={() => signOut()}>
                Logout
              </DropdownMenuItem>
            </>
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
  );
};

export default UserAccount;
