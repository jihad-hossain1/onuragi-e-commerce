"use client";

import Link from "next/link";
import { IoSettings } from "react-icons/io5";
import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { BsLayoutTextSidebarReverse } from "react-icons/bs";
import { motion } from "framer-motion";

const variants = {
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
  const [isOpen, toggleOpen] = useState(false);
  const downRef = React.useRef(null);

  const navItems = [
    {
      id: 1,
      name: "Dashboard",
      icon: <BsLayoutTextSidebarReverse size={20} />,
      link: "/dashboard",
    },
    {
      id: 2,
      name: "Manage Products",
      icon: <IoSettings size={20} />,
      link: "/dashboard/product-manage",
    },
    {
      id: 3,
      name: "Manage Category",
      icon: <IoSettings size={20} />,
      link: "/dashboard/category-manage",
    },
    {
      id: 4,
      name: "Manage Sub Category",
      icon: <IoSettings size={20} />,
      link: "/dashboard/sub-category-manage",
    },
    {
      id: 5,
      name: "Manage Banners",
      icon: <IoSettings size={20} />,
      link: "/dashboard/banners",
    },
    {
      id: 6,
      name: "Manage Posters",
      icon: <IoSettings size={20} />,
      link: "/dashboard/posters",
    },
    {
      id: 7,
      name: "Manage Offer Banner",
      icon: <IoSettings size={20} />,
      link: "/dashboard/offer-banner",
    },
    {
      id: 8,
      name: "Manage Offers",
      icon: <IoSettings size={20} />,
      link: "/dashboard/offers",
    },
  ];

  React.useEffect(() => {
    const close = (e) => {
      if (downRef.current && !downRef.current.contains(e.target))
        toggleOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div className="lg:hidden relative">
      <button
        onClick={() => toggleOpen(true)}
        className=" bg-pink-600 px-4 py-2 rounded-r-md shadow-md text-white"
      >
        <BsLayoutTextSidebarReverse size={20} />
      </button>
      {isOpen && (
        <nav
          ref={downRef}
          className="absolute top-0 left-0 w-64 h-screen bg-zinc-50  p-3  border border-zinc-600 shadow-lg rounded-r-xl"
        >
          <div className="flex justify-end">
            <button onClick={() => toggleOpen(false)}>
              <RxCross1 size={22} />
            </button>
          </div>
          <motion.ul
            variants={variants}
            className="flex flex-col gap-6 text-nowrap"
          >
            {navItems.map((item) => (
              <motion.li
                variants={liVariants}
                key={item.id}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href={item.link} className="flex gap-2 items-center">
                  <span className="text-sm">{item.icon}</span>
                  <span className="text-sm">{item.name}</span>
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </nav>
      )}
    </div>
  );
};

export default MobileSidebar;
