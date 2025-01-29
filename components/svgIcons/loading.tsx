import * as React from "react";
import { cn } from "@/lib/utils";
import { SvgIconType } from "./type";

const Loading = ({
  className,
  size = 15,
  strokeWidth = 2,
  strokeColor = "#464455",
}: SvgIconType) => (
  <svg
    width={size}
    height={size}
    className={cn(className)}
    strokeWidth={strokeWidth}
    viewBox="0 0 496 496"
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    fill="#000"
  >
    <g>
      <circle cx="248" cy="24" r="24" fill="#383A39"></circle>
      <circle cx="248" cy="472" r="24" fill="#ECEEEE"></circle>
      <circle cx="136" cy="53.6" r="24" fill="#77807F"></circle>
      <path
        fill="#F2F4F4"
        d="M380.8 430.4c6.4 11.2 2.4 25.6-8.8 32.8-11.2 6.4-25.6 2.4-32.8-8.8-6.4-11.2-2.4-25.6 8.8-32.8 11.2-6.4 26.4-2.4 32.8 8.8"
      ></path>
      <path
        fill="#9FAAA9"
        d="M65.6 115.2c11.2 6.4 15.2 20.8 8.8 32.8-6.4 11.2-20.8 15.2-32.8 8.8-11.2-6.4-15.2-20.8-8.8-32.8s21.6-15.2 32.8-8.8"
      ></path>
      <path
        fill="#F2F7F7"
        d="M454.4 339.2c11.2 6.4 15.2 20.8 8.8 32.8-6.4 11.2-20.8 15.2-32.8 8.8-11.2-6.4-15.2-20.8-8.8-32.8 6.4-11.2 20.8-15.2 32.8-8.8"
      ></path>
      <circle cx="24" cy="248" r="24" fill="#B2BBBA"></circle>
      <circle cx="472" cy="248" r="24" fill="#FFF"></circle>
      <path
        fill="#C5CCCB"
        d="M41.6 339.2c11.2-6.4 25.6-2.4 32.8 8.8 6.4 11.2 2.4 25.6-8.8 32.8-11.2 6.4-25.6 2.4-32.8-8.8s-2.4-25.6 8.8-32.8"
      ></path>
      <path d="M430.4 115.2c11.2-6.4 25.6-2.4 32.8 8.8 6.4 11.2 2.4 25.6-8.8 32.8-11.2 6.4-25.6 2.4-32.8-8.8-6.4-11.2-2.4-26.4 8.8-32.8"></path>
      <path
        fill="#D9DDDD"
        d="M115.2 430.4c6.4-11.2 20.8-15.2 32.8-8.8 11.2 6.4 15.2 20.8 8.8 32.8-6.4 11.2-20.8 15.2-32.8 8.8-11.2-7.2-15.2-21.6-8.8-32.8"
      ></path>
      <path
        fill="#111"
        d="M339.2 41.6c6.4-11.2 20.8-15.2 32.8-8.8 11.2 6.4 15.2 20.8 8.8 32.8-6.4 11.2-20.8 15.2-32.8 8.8-11.2-6.4-15.2-20.8-8.8-32.8"
      ></path>
    </g>
  </svg>
);

export default Loading;
