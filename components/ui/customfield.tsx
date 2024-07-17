"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React from "react";

interface InputFieldProps {
  label: string;
  type: string;
  name: string;
  id: string;
  autoComplete?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

const InputFieldCustom: React.FC<InputFieldProps> = ({
  label,
  type,
  name,
  id,
  autoComplete = "off",
  onChange,
  value,
  ...rest
}) => {
  useGSAP(() => {
    gsap.fromTo(
      "#gsaplabel",
      {
        opacity: 0,
        y: -16,
        x: -8,
        duration: 1,
      },
      {
        opacity: 1,
        duration: 2,
        y: 0,
        ease: "power1.inOut",
        delay: 1.5,
      }
    );
  }, []);
  return (
    <div className="relative flex flex-col">
      <label id="gsaplabel" htmlFor={id} className="ml-2 text-xs font-medium ">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        onChange={onChange}
        value={value}
        {...rest}
        placeholder={label}
        className="w-full text-gray-900  rounded border border-pink-500 px-1  shadow-sm focus-within:ring-1 focus-within:border-pink-700 focus:border-pink-100 focus:outline-none focus:ring-0 textgsap"
      />
    </div>
  );
};

export { InputFieldCustom };
