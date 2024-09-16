'use client';

import React from "react";
import { motion } from "framer-motion";

const Banner = () => {
  return (
    <div className="py-8 text-center bg-pink-400 text-white my-14">
      <motion.h4
        className="uppercase"
        animate={{ opacity: [0, 1], y: [20, 0] }}
        transition={{
          duration: 2,
          ease: "easeOut",
          repeat: Infinity, // Loop indefinitely
          repeatType: "reverse", // Reverse direction on each loop
        }}
      >
        UP TO 70% OFF THE ENTIRE STORE! – MADE WITH LOVE by{" "}
        <motion.span
          animate={{ opacity: [0, 1], x: [100, 0] }}
          transition={{
            duration: 2,
            ease: "easeOut",
            repeat: Infinity, // Loop indefinitely
            repeatType: "reverse", // Reverse direction on each loop
            delay: 1,
          }}
        >
          The4 studio
        </motion.span>
      </motion.h4>
    </div>
  );
};

export default Banner;
