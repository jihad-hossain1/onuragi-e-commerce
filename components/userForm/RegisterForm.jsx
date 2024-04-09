"use client";

import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";

const RegisterForm = () => {
  const [fullname, setfullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setusername] = useState("");

  const myObj = {
    fullname,
    email,
    password,
    username,
  };
  const handleRegister = async () => {
    try {
      await axios.post(`/api/v1/users`, { ...myObj });

      toast("Your Account has created Successfull", {
        description:
          "Go to Login page and login your account with email or username & password",
        action: {
          label: "Login",
          onClick: () => console.log("login"),
        },
      });

      setEmail("");
      setPassword("");
      setusername("");
      setfullname("");
    } catch (error) {
      console.log(error?.response?.data?.message);
      return toast(
        error?.response?.data?.message || error?.response?.data?.error
      );
    }
  };
  return (
    <div className="max-w-screen-sm mx-auto p-3 mt-20">
      <form action={handleRegister} className="flex flex-col gap-4 ">
        <input
          type="text"
          className="input"
          name=""
          value={fullname}
          placeholder="fullname"
          onChange={(e) => setfullname(e.target.value)}
          id=""
        />
        <input
          type="email"
          className="input"
          name=""
          value={email}
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          id=""
        />
        <input
          type="text"
          className="input"
          name=""
          value={username}
          placeholder="username"
          onChange={(e) => setusername(e.target.value)}
          id=""
        />
        <input
          type="password"
          className="input"
          name=""
          value={password}
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          id=""
        />
        <button className="btn" type="submit">
          register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
