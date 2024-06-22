"use client";

import { useRouter } from "next/navigation";
import {
  IoChevronBackCircleSharp,
  IoChevronBackCircleOutline,
} from "react-icons/io5";

const BackButton = () => {
  const router = useRouter();
  return (
    <>
      <div className="my-3">
        <button
          onClick={() => router.back()}
          className="border border-blue-300 rounded px-5 py-1 w-fit flex items-center gap-2 group"
        >
          <IoChevronBackCircleSharp className="hidden group-hover:block transition-all duration-300 ease-in-out" />
          <IoChevronBackCircleOutline className="block group-hover:hidden transition-all duration-300 ease-in-out" />
          <span className="text-sm">Go Back</span>
        </button>
      </div>
    </>
  );
};

export default BackButton;
