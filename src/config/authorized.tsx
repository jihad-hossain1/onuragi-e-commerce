"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

interface IProps {
  children: React.ReactNode;
}

const Authorized: React.FC<IProps> = ({ children }) => {
  const { status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-[70vh] text-pink-600">
        {"Loading..."}
      </div>
    );
  }

  if (status === "unauthenticated") {
    router.push("/login");
  }

  return <div>{children}</div>;
};

export default Authorized;
