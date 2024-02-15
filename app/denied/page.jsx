import Link from "next/link";
import React from "react";

const DeniedPage = () => {
  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="flex flex-col gap-3 items-center">
        <h4 className="uppercase">You are not allow</h4>
        <Link href={"/"} className="text-blue-600">
          Go Back
        </Link>
      </div>
    </div>
  );
};

export default DeniedPage;
