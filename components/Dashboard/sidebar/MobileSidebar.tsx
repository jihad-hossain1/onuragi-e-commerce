"use client";

import Link from "next/link";
import React, { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sidebarVariants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const liVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const MobileSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const downRef = useRef<HTMLDivElement>(null);

  const navItems = [
    {
      id: 1,
      name: "Dashboard",
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
        <path d="M12 3l9 9h-6v9H9v-9H3l9-9z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      ,
      link: "/dashboard",
    },
    {
      id: 2,
      name: "Manage Products",
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
        <path d="M17 10h4v11H3V10h4V5h10v5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      ,
      link: "/dashboard/product-manage",
    },
    {
      id: 3,
      name: "Manage Category",
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
        <path d="M15 6l3-3 4 4-3 3-4-4zm-4 3l-3 3v6h6v-6l-3-3zm-1 9h2v2H6v-4h6v2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      ,
      link: "/dashboard/category-manage",
    },
    {
      id: 4,
      name: "Manage Sub Category",
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
        <path d="M3 19v-2c0-2.21 1.79-4 4-4h2c2.21 0 4 1.79 4 4v2m3-4c0-2.21-1.79-4-4-4h-2c-2.21 0-4 1.79-4 4M16 3v3M12 6V3M6 6V3m5 6c0-2.21 1.79-4 4-4s4 1.79 4 4-1.79 4-4 4-4-1.79-4-4z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      ,
      link: "/dashboard/sub-category-manage",
    },
    {
      id: 5,
      name: "Manage Banners",
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
        <path d="M4 4h16v16H4V4zM12 9l3-3 3 3h-6z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      ,
      link: "/dashboard/banners",
    },
    {
      id: 6,
      name: "Manage Posters",
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
        <path d="M16 2H8c-1.1 0-1.99.89-1.99 2L6 18c0 1.1.89 2 1.99 2h12c1.1 0 1.99-.89 1.99-2V4c0-1.1-.89-2-1.99-2zM8 4h8v12H8V4zm9 14H7v-2h10v2zm0-4H7v-2h10v2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      ,
      link: "/dashboard/posters",
    },
    {
      id: 7,
      name: "Manage Offer Banner",
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
        <path d="M17 10V3h-4v7L6 9V5c0-1.1-.9-2-2-2s-2 .9-2 2v14c0 1.1.9 2 2 2s2-.9 2-2v-4l7 4V9l-7 4z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      ,
      link: "/dashboard/offer-banner",
    },
    {
      id: 8,
      name: "Manage Orders",
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
        <path d="M4 6h16M4 12h16M4 18h16M8 6v12M12 6v12M16 6v12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      ,
      link: "/dashboard/orders",
    },
    {
      id: 8,
      name: "Back to Home",
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
        <path d="M12 3l9 9h-6v9H9v-9H3l9-9z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      ,
      link: "/",
    },
  ];

  // Close the sidebar when clicking outside of it
  const closeSidebar = useCallback(
    (e: MouseEvent) => {
      if (downRef.current && !downRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    },
    [downRef]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", closeSidebar);
    } else {
      document.removeEventListener("mousedown", closeSidebar);
    }
    return () => document.removeEventListener("mousedown", closeSidebar);
  }, [isOpen, closeSidebar]);

  return (
    <div className="lg:hidden relative z-50">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className=" bg-gray-200 w-full px-4 py-2 rounded-r-md shadow-md text-gray-700"
        aria-label="Open Sidebar"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path d="M4 4h16M4 8h16M4 12h16M4 16h16M4 20h16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>

      </button>

      {/* Sidebar Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            ref={downRef}
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="fixed top-0 left-0 w-64 h-screen bg-zinc-50 dark:bg-zinc-800 p-4 border border-zinc-600 shadow-lg rounded-r-xl overflow-y-auto"
          >
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close Sidebar"
                className="text-gray-600 dark:text-gray-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                  <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>

              </button>
            </div>
            <motion.ul variants={sidebarVariants} className="flex flex-col gap-6">
              {navItems.map((item) => (
                <motion.li
                  variants={liVariants}
                  key={item.id}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href={item.link} className="flex gap-2 items-center">
                    <span className="text-sm">{item.icon}</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {item.name}
                    </span>
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileSidebar;
