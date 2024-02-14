"use client";

import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const UserForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setusername] = useState("");

  const router = useRouter();

  const objData = {
    email,
    password,
    username,
  };

  const handleLogin = async () => {
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (res.error) {
      setErrors("invalid credentials");
      return;
    }
    router.push("/");
  };
  return (
    <div className="max-w-screen-sm mx-auto p-3">
      <form action={handleLogin} className="flex flex-col gap-5 ">
        <input
          type="email"
          className="bg-transparent border p-3 rounded"
          name=""
          value={email}
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          id=""
        />

        <input
          type="password"
          className="bg-transparent border p-3 rounded"
          name=""
          value={password}
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          id=""
        />
        <button type="submit">login</button>
      </form>

      <div>
        <Link href={"/login/register"}>go to register</Link>
      </div>
    </div>
  );
};

export default UserForm;
