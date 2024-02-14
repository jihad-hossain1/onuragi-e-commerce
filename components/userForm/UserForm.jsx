"use client";

import Link from "next/link";
import { useState } from "react";

const UserForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setusername] = useState("");

  const objData = {
    email,
    password,
    username,
  };

  const handleLogin = () => {
    console.log(objData);
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
          type="text"
          className="bg-transparent border p-3 rounded"
          name=""
          value={username}
          placeholder="username"
          onChange={(e) => setusername(e.target.value)}
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
