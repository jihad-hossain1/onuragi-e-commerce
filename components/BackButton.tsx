"use client";

import { useRouter } from "next/navigation";


const BackButton = () => {
  const router = useRouter();
  return (
    <>
      <div className="my-3">
        <button
          onClick={() => router.back()}
          className="border border-blue-300 rounded px-5 py-1 w-fit flex items-center gap-2 group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path d="M15 18l-6-6 6-6M3 12a9 9 0 1 1 18 0 9 9 0 0 1-18 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>

          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path d="M15 18l-6-6 6-6M3 12a9 9 0 1 1 18 0 9 9 0 0 1-18 0z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>

          <span className="text-sm">Go Back</span>
        </button>
      </div>
    </>
  );
};

export default BackButton;
