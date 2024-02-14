"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
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
    <div className="max-w-screen-sm mx-auto p-3">
      RegisterForm
      <form action={handleRegister} className="flex flex-col gap-4 ">
        <input
          type="text"
          className="border p-3 bg-transparent rounded"
          name=""
          value={fullname}
          placeholder="fullname"
          onChange={(e) => setfullname(e.target.value)}
          id=""
        />
        <input
          type="email"
          className="border p-3 bg-transparent rounded"
          name=""
          value={email}
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          id=""
        />
        <input
          type="text"
          className="border p-3 bg-transparent rounded"
          name=""
          value={username}
          placeholder="username"
          onChange={(e) => setusername(e.target.value)}
          id=""
        />
        <input
          type="password"
          className="border p-3 bg-transparent rounded"
          name=""
          value={password}
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          id=""
        />
        <Button
          className="hover:bg-zinc-700 hover:text-white"
          variant="ghost"
          type="submit"
          // onClick={() =>
          //   toast("Event has been created", {
          //     description: "Sunday, December 03, 2023 at 9:00 AM",
          //     action: {
          //       label: "Undo",
          //       onClick: () => console.log("Undo"),
          //     },
          //   })
          // }
        >
          register
        </Button>
      </form>
    </div>
  );
};

export default RegisterForm;
