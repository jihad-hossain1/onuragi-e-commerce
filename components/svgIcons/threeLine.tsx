import * as React from "react";
import { SvgIconType } from "./type";
import { cn } from "@/lib/utils";

const ThreeLine = ({
  className,
  color,
  size = 15,
  strokeColor = "black",
  strokeWidth = 2,
}: SvgIconType) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    className={cn(className)}
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      stroke={strokeColor}
      strokeLinecap="round"
      strokeWidth={strokeWidth}
      d="M5 6h14M5 12h14M5 18h14"
    ></path>
  </svg>
);

export default React.memo(ThreeLine);
