"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { signOut, useSession } from "next-auth/react";

const UserAccount = () => {
  const { status } = useSession();
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <HiOutlineUserCircle size={30} />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {status === "authenticated" ? (
            <>
              <DropdownMenuItem>Dashboard</DropdownMenuItem>
              <DropdownMenuItem>Adress</DropdownMenuItem>
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
    </>
  );
};

export default UserAccount;
