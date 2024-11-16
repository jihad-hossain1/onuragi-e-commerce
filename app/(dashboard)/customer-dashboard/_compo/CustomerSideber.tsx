"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";


const navItems = [
  {
    href: "/customer-dashboard", label: "Dashboard", icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
      <path d="M12 3l9 7-1 12H4L3 10l9-7z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  },
  {
    href: "/customer-dashboard/user-profile", label: "Profile", icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
      <path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm-1-6h2v2h-2zm-1 4h4v2h-4zM19.07 15c-.14 0-.28-.06-.39-.17l-2.24-2.24a7.926 7.926 0 0 0-3.04 1.28l-1.75 2.97a7.979 7.979 0 0 0-5.3 0l-1.75-2.97a7.926 7.926 0 0 0-3.04-1.28L4.93 14.83c-.11.11-.25.17-.39.17-.55 0-.95-.56-.95-1.06 0-.18.07-.36.19-.5l2.24-2.24a7.978 7.978 0 0 0-1.28-3.04l-2.97-1.75c-.1-.16-.14-.35-.14-.55 0-.55.56-.95 1.06-.95.18 0 .36.07.5.19l2.24 2.24a7.978 7.978 0 0 0 3.04-1.28l1.75-2.97a7.979 7.979 0 0 0 5.3 0l1.75 2.97a7.978 7.978 0 0 0 3.04 1.28l2.24-2.24c.14-.12.32-.19.5-.19.55 0 .95.56.95 1.06 0 .2-.07.4-.19.55l-2.24 2.24a7.978 7.978 0 0 0 1.28 3.04l2.97 1.75c.1.16.14.35.14.55 0 .55-.56.95-1.06.95z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  },
  {
    href: "/customer-dashboard/cart", label: "Cart", icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
      <path d="M4 3h2l3 7h10l3-7h2M6 6h12l2 8H4L6 6zm3 10h2v2H9zm6 0h2v2h-2zm-3 0h2v2h-2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  },
  {
    href: "/customer-dashboard/orders", label: "My Orders", icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
      <path d="M3 3h2l3 7h10l3-7h2M6 6h12l2 8H4L6 6zm3 10h2v2H9zm6 0h2v2h-2zm-3 0h2v2h-2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  },
  {
    href: "/customer-dashboard/returns", label: "My Returns", icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
      <path d="M10 9v6l5-3-5-3zm4 6V9l-5 3 5 3zM19 2h-4V1h-6v1H5c-1.1 0-1.99.9-1.99 2L3 20c0 1.1.89 2 1.99 2H19c1.1 0 1.99-.9 1.99-2l.01-16c0-1.1-.89-2-1.99-2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  },
  {
    href: "/customer-dashboard/helps", label: "Need Help", icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
      <path d="M12 3C7.03 3 3 7.03 3 12s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm0-8h-1c-1.1 0-1.99.9-1.99 2v2h2v-2h.99c1.1 0 1.99-.9 1.99-2 0-1.1-.89-2-1.99-2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  },
  {
    href: "/", label: "Back to Home", icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
      <path d="M3 9l9-6 9 6v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  },
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
        {isOpen ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
          : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        }
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
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <path d="M13 3v8h8M17 7h6M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>

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
