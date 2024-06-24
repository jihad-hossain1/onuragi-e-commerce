"use client";

import * as React from "react";
import { motion } from "framer-motion";

// import "./style.css";

const variants = {
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

const colors = ["#FF008C", "#D309E1", "#9C1AFF", "#7700FF", "#4400FF"];

export const MenuItem = ({ i }) => {
  const style = {
    border: `2px solid ${colors[i]}`,
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    flex: "0 0 40px",
    marginRight: "20px",
  };
  return (
    <motion.li
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      //   className="space-y-5 cursor-pointer"
    >
      <div className="icon-placeholder" style={style} />
      <div style={style} />
    </motion.li>
  );
};
