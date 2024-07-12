"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { toast } from "sonner";
import InputField from "../../components/ui/InputField";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Loader from "../loader/Loader";

const UserForm = () => {
  const { status } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setloading] = useState(false);

  const router = useRouter();

  const handleLogin = async () => {
    if (email == "") {
      return toast.error("email are required", {
        position: "top-center",
        duration: 2000,
        style: {
          background: "#fff",
          color: "red",
          padding: "10px",
          borderRadius: "10px",
        },
      });
    } else if (password == "") {
      return toast.error("password must be needed", {
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
      return toast.error("password must be 6 character", {
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

      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

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
      }
      if (res?.ok) {
        setloading(true);
        toast("LOGIN SUCCESSFULL");
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

  if (status == "loading" && loading) return <Loader />;

  return (
    <div className="text-white max-sm:w-[390px] w-[500px] mx-auto max-sm:px-5 max-sm:py-8 bg-pink-700 p-20 rounded-xl shadow-[4px_35px_60px_-15px_rgba(0,0,0,0.3)] ">
      <form action={handleLogin} className="flex flex-col gap-5 ">
        <h1 className="text-3xl font-bold my-6 textgsap">Login</h1>

        <InputField
          label="Email"
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          {loading ? "Loading..." : " login"}
        </button>
      </form>

      <div className="flex gap-1 items-center text-sm mt-2 textgsap">
        <h4> You have no account ?</h4>
        <Link
          href={"/login/register"}
          className="font-semibold hover:underline"
        >
          register
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
