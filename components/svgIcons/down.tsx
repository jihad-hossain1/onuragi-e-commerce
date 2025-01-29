import * as React from "react";
import { SvgIconType } from "./type";
import { cn } from "@/lib/utils";

const Down = ({
  className,
  size = 15,
  strokeWidth,
  strokeColor = "#464455",
}: SvgIconType) => (
  <svg
    width={size}
    height={size}
    className={cn(className)}
    strokeWidth={strokeWidth}
    viewBox="0 0 64 64"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path fill="none" d="M-192-128h1280v800H-192z"></path>
    <g>
      <path
        stroke={strokeColor}
        fillRule="nonzero"
        d="M32.149 45.79 8.078 21.719l3.009-3.009 21.062 21.062L53.21 18.71l3.009 3.009z"
      ></path>
    </g>
  </svg>
);

export default React.memo(Down);
