"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn, useSession, signOut } from "next-auth/react";
import UserForm from "@/components/userForm/UserForm";

const LoginPage = () => {
  const { status, data: session } = useSession();
  return (
    <main className="max-w-screen-md p-4">
      <h4>Login page</h4>
      <button onClick={() => signIn("google")} className="border px-3">
        Login by Google
      </button>
      <UserForm />
    </main>
  );
};

export default LoginPage;
