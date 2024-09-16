"use client";

import Link from "next/link";
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import {
  FaAddressBook,
  FaFlag,
  FaGamepad,
  FaHome,
  FaList,
  FaProductHunt,
} from "react-icons/fa";
import { FaGroupArrowsRotate, FaUserGroup } from "react-icons/fa6";

// Sidebar animation variants
const sidebarVariants = {
  hidden: { x: "-100%", opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 50, damping: 20, duration: 0.7 },
  },
};

// Link hover animation variants
const linkVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
  hover: {
    scale: 1.1,
    color: "#ff4081",
    transition: { duration: 0.2 },
  },
};

// Icon hover animation
const iconVariants = {
  hover: { rotate: [0, 10, -10, 0], transition: { duration: 0.5 } },
};

// Reusable SidebarLink component
const SidebarLink = ({ href, Icon, label }: { href: string; Icon: React.ElementType; label: string }) => (
  <motion.div
    variants={linkVariants}
    whileHover="hover"
    initial="hidden"
    animate="visible"
    className="flex items-center gap-2 p-2 hover:bg-pink-100 dark:hover:bg-zinc-700 rounded-md"
  >
    <motion.div variants={iconVariants}>
      <Icon size={20} />
    </motion.div>
    <span className="text-sm">{label}</span>
  </motion.div>
);

const Sidebar = () => {
  // Memoize the icon links array to avoid unnecessary re-renders
  const links = useMemo(
    () => [
      { href: "/dashboard/product-manage", Icon: FaProductHunt, label: "Products" },
      { href: "/dashboard/category-manage", Icon: FaGroupArrowsRotate, label: "Category" },
      { href: "/dashboard/sub-category-manage", Icon: FaUserGroup, label: "Sub Category" },
      { href: "/dashboard/banners", Icon: FaAddressBook, label: "Banner" },
      { href: "/dashboard/posters", Icon: FaGamepad, label: "Posters" },
      { href: "/dashboard/offer-banner", Icon: FaFlag, label: "Offer Banner" },
      { href: "/dashboard/orders", Icon: FaList, label: "Orders" },
      { href: "/", Icon: FaHome, label: "Back To Home" },
    ],
    []
  );

  return (
    <motion.div
      className="hidden lg:block bg-zinc-50 dark:bg-zinc-800 md:h-screen p-3 shadow border-r border-zinc-200 md:overflow-auto"
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <div className="flex flex-col gap-6 text-nowrap">
        {links.map((link, idx) => (
          <Link href={link.href} key={idx}>
            <SidebarLink Icon={link.Icon} label={link.label} href={link.href} />
          </Link>
        ))}
      </div>
    </motion.div>
  );
};

export default Sidebar;
