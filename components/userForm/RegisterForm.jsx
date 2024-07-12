"use client";

import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { validatedTag } from "@/helpers/validated-tag";
import InputField from "../../components/ui/InputField";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const RegisterForm = () => {
  const [fullname, setfullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setusername] = useState("");
  const router = useRouter();

  const myObj = {
    fullname,
    email,
    password,
    username,
  };
  const handleRegister = async () => {
    try {
      await axios.post(`/api/v1/users`, { ...myObj });
      validatedTag("user");

      toast("Your Account has created Successful", {
        description:
          "Go to Login page and login your account with email or username & password",
        action: {
          label: <a href="/login">Login</a>,
          // onClick: () => console.log("login"),
        },
      });

      setEmail("");
      setPassword("");
      setusername("");
      setfullname("");
      router.push("/login");
    } catch (error) {
      console.log(error?.response?.data?.message);
      return toast.error(
        error?.response?.data?.message || error?.response?.data?.error,
        {
          position: "top-center",
          duration: 2000,
          style: {
            background: "#fff",
            color: "red",
            padding: "10px",
            borderRadius: "10px",
          },
        }
      );
    }
  };

  useGSAP(() => {
    gsap.fromTo(
      ".textgsap",
      {
        opacity: 0,
        duration: 1,
        x: -160,
        // ease: "elastic.inOut",
        stagger: 0.1,
      },
      {
        opacity: 1,
        x: 0,
        y: 0,
        stagger: 0.1,
        duration: 1,
        ease: "elastic.inOut",
      }
    );
  }, []);
  return (
    <div className="text-white max-sm:w-[390px] w-[500px] mx-auto max-sm:px-5 max-sm:py-8 bg-pink-700 p-20 rounded-xl shadow-[4px_35px_60px_-15px_rgba(0,0,0,0.3)] ">
      <h1 className="text-3xl font-bold my-6 textgsap">Register</h1>
      <form action={handleRegister} className="flex flex-col gap-1">
        <InputField
          label="Full Name"
          type="text"
          name="fullname"
          id="fullname"
          value={fullname}
          onChange={(e) => setfullname(e.target.value)}
        />
        <InputField
          label="Email"
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          label="User Name"
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={(e) => setusername(e.target.value)}
        />
        <InputField
          label="Password"
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn textgsap" type="submit">
          register
        </button>
      </form>

      <div className="flex gap-1 items-center text-sm mt-3 textgsap">
        <h4>Already have an account ?</h4>
        <Link href={"/login"} className="">
          Login
        </Link>
      </div>

      <div className="my-6 textgsap">
        <Link href="/login" className="btn ">
          Back
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;
