"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { toast } from "sonner";
import InputField from "../../components/ui/InputField";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const UserForm = () => {
  const { status } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setloading] = useState(false);

  const router = useRouter();

  const handleLogin = async () => {
    if (email == "") {
      return toast("email are required");
    } else if (password == "") {
      return toast("password must be needed");
    } else if (password?.length < 6) {
      return toast("password must be 6 character");
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
        toast(res?.error);
      }
      if (res?.ok) {
        setloading(true);
        toast("LOGIN SUCCESSFULL");
        router.back();
      }
    } catch (error) {
      toast(error?.message);
      console.log(error);
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

  if (status == "loading" && loading)
    return (
      <div className="flex flex-col justify-center items-center text-pink-500 text-sm min-h-[70vh]">
        {"Loading..."}
      </div>
    );

  if (status == "authenticated") {
    return (
      <div className="flex flex-col gap-2 items-center min-h-[70vh]">
        <h4>You are already logged in</h4>
        <Link href="/" className="btn">
          Go Back
        </Link>
      </div>
    );
  }
  return (
    <div className="max-w-[600px] mx-auto min-h-[70vh] mt-20">
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

      <div>
        <div className="flex gap-1 items-center text-sm mt-2 textgsap">
          <h4> You have no account ?</h4>
          <Link
            href={"/login/register"}
            className="font-semibold hover:underline"
          >
            register
          </Link>
        </div>
        {/* <button
          onClick={() => signIn("google")}
          className="mt-3 border border-green-400 w-full px-3 rounded-lg py-1 text-sm hover:bg-green-500 hover:text-white transition duration-300"
        >
          Login by Google
        </button> */}
      </div>
    </div>
  );
};

export default UserForm;
