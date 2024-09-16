"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { toast } from "sonner";
import InputField from "../../components/ui/InputField";
import gsap from "gsap";
import Loader from "../loader/Loader";

const UserForm = () => {
  const { status } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setloading] = useState(false);

  const router = useRouter();
  const formRef = useRef(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (email === "") {
      return toast.error("Email is required", {
        position: "top-center",
        duration: 2000,
        style: {
          background: "#fff",
          color: "red",
          padding: "10px",
          borderRadius: "10px",
        },
      });
    } else if (password === "") {
      return toast.error("Password is required", {
        position: "top-center",
        duration: 2000,
        style: {
          background: "#fff",
          color: "red",
          padding: "10px",
          borderRadius: "10px",
        },
      });
    } else if (password?.length < 6) {
      return toast.error("Password must be at least 6 characters", {
        position: "top-center",
        duration: 2000,
        style: {
          background: "#fff",
          color: "red",
          padding: "10px",
          borderRadius: "10px",
        },
      });
    }

    try {
      setloading(true);
      const res = await signIn("credentials", { email, password, redirect: false });

      if (!res?.ok) {
        setloading(false);
        toast.error(res?.error, {
          position: "top-center",
          duration: 2000,
          style: {
            background: "#fff",
            color: "red",
            padding: "10px",
            borderRadius: "10px",
          },
        });
      } else {
        setloading(true);
        toast("Login Successful");
        router.back();
      }
    } catch (error) {
      toast.error(error?.message, {
        position: "top-center",
        duration: 2000,
        style: {
          background: "#fff",
          color: "red",
          padding: "10px",
          borderRadius: "10px",
        },
      });
      console.error(error);
    }
  };

  useEffect(() => {
    const timeline = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });
    
    timeline.fromTo(
      ".textgsap", 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, stagger: 0.2 }
    );
    
    timeline.fromTo(
      ".btn",
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "elastic.out(1, 0.75)" },
      "-=0.5"
    );
  }, []);

  if (status === "loading" && loading) return <Loader />;

  return (
    <div className="text-white max-sm:w-[390px] w-[500px] mx-auto max-sm:px-5 max-sm:py-8 bg-pink-200/90 p-20 rounded-xl shadow-[0px_0px_2px_rgba(0,0,0,0.3)] ">
      <form ref={formRef} onSubmit={handleLogin} className="text-pink-600 flex flex-col gap-5">
        <h1 className="text-3xl font-bold my-6 textgsap">Login</h1>

        <InputField
          label="Email"
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="textgsap"
        />

        <InputField
          label="Password"
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="textgsap"
        />

        <button className="btn textgsap" type="submit">
          {loading ? "Loading..." : "Login"}
        </button>
      </form>

      <div className="flex gap-1 items-center text-sm mt-2 textgsap text-pink-600">
        <h4>You have no account?</h4>
        <Link href="/login/register" className="font-semibold hover:underline">
          Register
        </Link>
      </div>
      <div className="mt-4">
        <a href="/" className="btn textgsap">
          Back to home
        </a>
      </div>
    </div>
  );
};

export default UserForm;
