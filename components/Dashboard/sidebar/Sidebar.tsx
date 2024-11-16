"use client";

import Link from "next/link";
import React, { useMemo } from "react";
import { motion } from "framer-motion";

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
const SidebarLink = ({ href, Icon, label }: { href: string; Icon: any; label: string }) => (
  <motion.div
    variants={linkVariants}
    whileHover="hover"
    initial="hidden"
    animate="visible"
    className="flex items-center gap-2 p-2 hover:bg-pink-100 dark:hover:bg-zinc-700 rounded-md"
  >
    <motion.div variants={iconVariants}>
      {Icon}
    </motion.div>
    <span className="text-sm">{label}</span>
  </motion.div>
);

const Sidebar = () => {
  // Memoize the icon links array to avoid unnecessary re-renders
  const links = useMemo(
    () => [
      {
        href: "/dashboard/product-manage", Icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path d="M4 3h16v18H4zM12 3V1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M9 7h6m-6 4h6m-6 4h6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        , label: "Products"
      },
      {
        href: "/dashboard/category-manage", Icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path d="M12 4a8 8 0 0 1 8 8c0 1.27-.31 2.46-.85 3.54l-1.48-1.02c.39-.65.63-1.42.63-2.3A5.99 5.99 0 0 0 12 5a6 6 0 1 0-5.35 8.27l-1.71-1.71a8.02 8.02 0 0 1 4.06-9.54l1.42 1.42A7.92 7.92 0 0 1 12 4z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        , label: "Category"
      },
      {
        href: "/dashboard/sub-category-manage", Icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path d="M16 11c1.39 0 2.63.55 3.54 1.46L21 10c0-1.66-1.34-3-3-3h-4v4h3zm-4 0v-4h-3v4H7l2 2c-1.39.81-2.39 2.34-2.39 4.05V19h8v-1.94c0-1.71-.99-3.24-2.39-4.05l2-2zM12 12c-1.38 0-2.62-.56-3.54-1.46L3 14c0 1.66 1.34 3 3 3h4v-4H12zm0 4h-4v2h4z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        , label: "Sub Category"
      },
      {
        href: "/dashboard/banners", Icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path d="M19 3H5c-1.1 0-1.99.89-1.99 2L3 19c0 1.1.89 2 1.99 2h14c1.1 0 1.99-.89 1.99-2V5c0-1.1-.89-2-1.99-2zM5 5h14v14H5V5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M8 7h8M8 11h8M8 15h8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        , label: "Banner"
      },
      {
        href: "/dashboard/posters", Icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path d="M6 9h12M12 3v12M6 15h12M2 3l1.5 1.5L3 6h3l1.5 1.5L6 9h12l1.5-1.5L22 6h3l1.5-1.5L22 3H2zm6 6h6v2H8z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        , label: "Posters"
      },
      {
        href: "/dashboard/offer-banner", Icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path d="M6 4v16l6-4 6 4V4l-6 4-6-4z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        , label: "Offer Banner"
      },
      {
        href: "/dashboard/orders", Icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        , label: "Orders"
      },
      {
        href: "/", Icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path d="M12 3l9 9h-6v9H9v-9H3l9-9z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        , label: "Back To Home"
      },
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
