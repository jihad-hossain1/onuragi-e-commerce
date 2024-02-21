"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Topbar = () => {
  return (
    <main className="border-b pb-2 py-2 shadow-sm">
      <section className="max-w-screen-xl m-auto">
        <div className="flex items-center justify-between">
          <h4 className="text-sm">Add anything here or just remove it...</h4>
          <div className="flex gap-10">
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
        <DropdownMenuTrigger className="text-sm">Language</DropdownMenuTrigger>
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
        <DropdownMenuTrigger className="text-sm">Currency</DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>BDT</DropdownMenuItem>
          <DropdownMenuItem>USD</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default Topbar;
