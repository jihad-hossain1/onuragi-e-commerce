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
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { FaHome } from "react-icons/fa";

const navItems = [
  { href: "/customer-dashboard", label: "Dashboard", icon: <IoHomeOutline size={26} /> },
  { href: "/customer-dashboard/user-profile", label: "Profile", icon: <RiUserSettingsLine size={26} /> },
  { href: "/customer-dashboard/cart", label: "Cart", icon: <CiShoppingCart size={26} /> },
  { href: "/customer-dashboard/orders", label: "My Orders", icon: <BsFillCartCheckFill size={26} /> },
  { href: "/customer-dashboard/returns", label: "My Returns", icon: <MdOutlineAssignmentReturn size={26} /> },
  { href: "/customer-dashboard/helps", label: "Need Help", icon: <TfiHelpAlt size={26} /> },
  { href: "/", label: "Back to Home", icon: <FaHome size={26} /> },
];

const CustomerSidebar = () => {
  const { data: session } = useSession();
  const path = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button
        className={`md:hidden p-2 text-gray-600 hover:text-gray-900 fixed ${isOpen ? "top-2 right-4 w-fit" : "top-2 left-2 w-full"} z-50 bg-gray-50 shadow  `}
        onClick={toggleSidebar}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <AiOutlineClose size={28} /> : <AiOutlineMenu size={28} />}
      </button>

      <aside
        className={`fixed inset-0 bg-white shadow-lg transform transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0 scale-100 opacity-100' : 'translate-x-full scale-95 opacity-90'} md:relative md:translate-x-0 md:shadow-none md:w-auto md:max-w-[400px] md:bg-white md:border-r md:border-gray-200 z-40`}
      >
        <div className="flex gap-4 bg-slate-100 py-7 px-5 items-center">
          <div className="h-16 w-16 shadow-lg rounded-full p-2 bg-pink-600 text-white font-semibold flex items-center justify-center">
            {session?.user?.name?.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <h4 className="text-sm">Hi.</h4>
            <h3 className="text-xl font-semibold text-nowrap">
              {session?.user?.name}
            </h3>
          </div>
        </div>
        <nav className="flex flex-col gap-1">
          {navItems.map(({ href, label, icon }) => (
            <Link
              key={href}
              href={href}
              onClick={closeSidebar}
              className={`flex gap-2 items-center pl-3 py-3 rounded transition duration-300 ease-in-out ${path === href
                  ? "bg-pink-100/35 border-l-4 border-pink-700"
                  : "hover:bg-pink-100/35 hover:border-l-4 hover:border-pink-700"
                }`}
              aria-current={path === href ? "page" : undefined}
            >
              {icon}
              <h3 className="text-sm md:text-base">{label}</h3>
            </Link>
          ))}
          <button
            onClick={() =>
              signOut({
                callbackUrl: "/login",
              })
            }
            className="flex gap-2 items-center pl-3 py-3 rounded transition duration-300 ease-in-out hover:bg-pink-100/35 hover:border-l-4 hover:border-pink-700"
          >
            <GoSignOut size={26} />
            <h3 className="text-sm md:text-base">Log Out</h3>
          </button>
        </nav>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 backdrop-blur-md z-30 md:hidden transition-opacity duration-500 ease-in-out"
          onClick={closeSidebar}
          aria-label="Close menu overlay"
        ></div>
      )}
    </>
  );
};

export default CustomerSidebar;
