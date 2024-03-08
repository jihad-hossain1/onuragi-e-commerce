"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaAngleDown } from "react-icons/fa6";

const Topbar = () => {
  return (
    <main className="border-b pb-2 py-2 shadow-sm">
      <section className="max-w-screen-xl m-auto">
        <div className="flex items-center lg:justify-between justify-end lg:px-0 px-2">
          <h4 className="text-sm lg:block hidden">
            Add anything here or just remove it...
          </h4>
          <div className="flex gap-5 ">
            <Language />
            <Currency />
          </div>
        </div>
      </section>
    </main>
  );
};

const Language = () => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="text-sm flex gap-1 items-center">
          <span>English</span>
          <FaAngleDown />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>English</DropdownMenuItem>
          <DropdownMenuItem>Bangla</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

const Currency = () => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="text-sm flex gap-1 items-center">
          <span>BDT</span> <FaAngleDown />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>BDT</DropdownMenuItem>
          <DropdownMenuItem>USD</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default Topbar;
