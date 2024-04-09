"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { toast } from "sonner";

const UserForm = () => {
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
        router.push("/");
      }
    } catch (error) {
      toast(error?.message);
      console.log(error);
    }
  };

  const { status } = useSession();

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
          type="password"
          className="input"
          name=""
          value={password}
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          id=""
        />
        <button className="btn" type="submit">
          {loading ? "Loading..." : " login"}
        </button>
      </form>

      <div>
        <div className="flex gap-1 items-center text-sm mt-2">
          <h4> You have no account ?</h4>
          <Link
            href={"/login/register"}
            className="font-semibold hover:underline"
          >
            register
          </Link>
        </div>
        <button
          onClick={() => signIn("google")}
          className="mt-3 border border-green-400 w-fit px-3 rounded-lg py-1 text-sm hover:bg-green-500 hover:text-white transition duration-300"
        >
          Login by Google
        </button>
      </div>
    </div>
  );
};

export default UserForm;
