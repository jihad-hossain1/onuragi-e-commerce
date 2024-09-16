"use client";

import Link from "next/link";
import React, { useState, useCallback, useEffect, useRef } from "react";
import { RxCross1 } from "react-icons/rx";
import { BsLayoutTextSidebarReverse } from "react-icons/bs";
import { FaHome, FaBoxes, FaTags, FaUserFriends, FaImages, FaBullhorn, FaListAlt, FaClipboardList } from "react-icons/fa";
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
      icon: <FaHome size={20} />,
      link: "/dashboard",
    },
    {
      id: 2,
      name: "Manage Products",
      icon: <FaBoxes size={20} />,
      link: "/dashboard/product-manage",
    },
    {
      id: 3,
      name: "Manage Category",
      icon: <FaTags size={20} />,
      link: "/dashboard/category-manage",
    },
    {
      id: 4,
      name: "Manage Sub Category",
      icon: <FaUserFriends size={20} />,
      link: "/dashboard/sub-category-manage",
    },
    {
      id: 5,
      name: "Manage Banners",
      icon: <FaImages size={20} />,
      link: "/dashboard/banners",
    },
    {
      id: 6,
      name: "Manage Posters",
      icon: <FaClipboardList size={20} />,
      link: "/dashboard/posters",
    },
    {
      id: 7,
      name: "Manage Offer Banner",
      icon: <FaBullhorn size={20} />,
      link: "/dashboard/offer-banner",
    },
    {
      id: 8,
      name: "Manage Orders",
      icon: <FaListAlt size={20} />,
      link: "/dashboard/orders",
    },
    {
      id: 8,
      name: "Back to Home",
      icon: <FaHome size={20} />,
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
        <BsLayoutTextSidebarReverse size={20} />
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
                <RxCross1 size={22} />
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
