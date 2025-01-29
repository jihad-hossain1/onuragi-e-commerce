import * as React from "react";
import { SvgIconType } from "./type";
import { cn } from "@/lib/utils";

const Close = ({
  className,
  size = 15,
  strokeWidth,
  strokeColor = "#464455",
}: SvgIconType) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width={size}
    height={size}
    fillRule="evenodd"
    strokeLinejoin="round"
    strokeMiterlimit="2"
    clipRule="evenodd"
    viewBox="0 0 64 64"
    className={cn(className)}
    strokeWidth={strokeWidth}
    stroke={strokeColor}
  >
    <path fill="none" d="M-448-64H832v800H-448z"></path>
    <g>
      <path d="m32.033 29.19 15.55-15.55 2.863 2.863-15.55 15.55 15.55 15.55-2.863 2.863-15.55-15.55-15.55 15.55-2.863-2.863 15.55-15.55-15.55-15.55 2.863-2.863z"></path>
      <path d="m32.033 29.19 15.55-15.55 2.863 2.863-15.55 15.55 15.55 15.55-2.863 2.863-15.55-15.55-15.55 15.55-2.863-2.863 15.55-15.55-15.55-15.55 2.863-2.863z"></path>
    </g>
  </svg>
);

export default React.memo(Close);
