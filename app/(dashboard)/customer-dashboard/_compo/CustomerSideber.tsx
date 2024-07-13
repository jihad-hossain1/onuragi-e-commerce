"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { IoHomeOutline } from "react-icons/io5";
import { RiUserSettingsLine } from "react-icons/ri";
import { CiShoppingCart } from "react-icons/ci";
import { BsFillCartCheckFill } from "react-icons/bs";
import { GoSignOut } from "react-icons/go";
import { MdOutlineAssignmentReturn } from "react-icons/md";
import { TfiHelpAlt } from "react-icons/tfi";

const CustomerSideber = () => {
  const { data: session } = useSession();
  const path = usePathname();

  return (
    <aside className="bg-white max-w-[400px]">
      <div className="flex gap-2 bg-slate-100 py-7 px-5">
        <div className="h-16 w-16 shadow drop-shadow-md rounded-full p-2 bg-pink-600 text-white font-semibold flex items-center justify-center">
          {session?.user?.name?.slice(0, 2).toUpperCase()}
        </div>
        <div>
          <h4>Hi.</h4>
          <h3 className="text-xl font-semibold text-nowrap">
            {session?.user?.name}
          </h3>
        </div>
      </div>
      <nav className="flex flex-col gap-1">
        <Link
          href={"/customer-dashboard"}
          className={`${
            path == "/customer-dashboard"
              ? "bg-pink-100/35 border-l-[5px] border-pink-700"
              : ""
          } flex gap-2 items-center pl-3 py-3 hover:bg-pink-100/35 hover:border-l-[5px] hover:border-pink-700 transition duration-500 ease-in-out`}
        >
          <IoHomeOutline size={26} />
          <h3>Dashboard</h3>
        </Link>
        <Link
          href={"/customer-dashboard/user-profile"}
          className={`${
            path == "/customer-dashboard/user-profile"
              ? "bg-pink-100/35 border-l-[5px] border-pink-700 "
              : ""
          } flex gap-2 items-center pl-3 py-3 hover:bg-pink-100/35 hover:border-l-[5px] hover:border-pink-700 transition duration-500 ease-in-out`}
        >
          <RiUserSettingsLine size={26} />
          <h3>Profile</h3>
        </Link>
        <Link
          href={"/customer-dashboard/cart"}
          className={`${
            path == "/customer-dashboard/cart"
              ? "bg-pink-100/35 border-l-[5px] border-pink-700 "
              : ""
          } flex gap-2 items-center pl-3 py-3 hover:bg-pink-100/35 hover:border-l-[5px] hover:border-pink-700 transition duration-500 ease-in-out`}
        >
          <CiShoppingCart size={26} />
          <h3>Carts</h3>
        </Link>
        <Link
          href={"/customer-dashboard/orders"}
          className={`${
            path == "/customer-dashboard/orders"
              ? "bg-pink-100/35 border-l-[5px] border-pink-700 "
              : ""
          } flex gap-2 items-center pl-3 py-3 hover:bg-pink-100/35 hover:border-l-[5px] hover:border-pink-700 transition duration-500 ease-in-out`}
        >
          <BsFillCartCheckFill size={26} />
          <h3>My Orders</h3>
        </Link>

        <Link
          href={"/customer-dashboard/returns"}
          className={`${
            path == "/customer-dashboard/returns"
              ? "bg-pink-100/35 border-l-[5px] border-pink-700 "
              : ""
          } flex gap-2 items-center pl-3 py-3 hover:bg-pink-100/35 hover:border-l-[5px] hover:border-pink-700 transition duration-500 ease-in-out`}
        >
          <MdOutlineAssignmentReturn size={26} />
          <h3>My Returns</h3>
        </Link>

        <Link
          href={"/customer-dashboard/helps"}
          className={`${
            path == "/customer-dashboard/helps"
              ? "bg-pink-100/35 border-l-[5px] border-pink-700 "
              : ""
          } flex gap-2 items-center pl-3 py-3 hover:bg-pink-100/35 hover:border-l-[5px] hover:border-pink-700 transition duration-500 ease-in-out`}
        >
          <TfiHelpAlt size={26} />
          <h3>Need Help</h3>
        </Link>
        <button
          onClick={() =>
            signOut({
              callbackUrl: "/login",
            })
          }
          className={`flex gap-2 items-center pl-3 py-3 hover:bg-pink-100/35 hover:border-l-[5px] hover:border-pink-700 transition duration-500 ease-in-out`}
        >
          <GoSignOut size={26} />
          <h3>Log Out</h3>
        </button>
      </nav>
    </aside>
  );
};

export default CustomerSideber;
