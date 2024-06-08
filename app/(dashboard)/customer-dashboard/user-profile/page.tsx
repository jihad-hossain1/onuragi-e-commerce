

import { options } from "@/app/api/auth/[...nextauth]/options";
// import { getUser } from "@/app/api/frontend/users/users";
// import { User } from "@/helpers/types/types";
import { fetchUser } from "@/utils/users/fetchuser";
import { getServerSession } from "next-auth/next";
import React from "react";
import Profile from "./_compo/profile";

const ProfilePage = async () => {
  const session = await getServerSession(options)
  const id = session?.user?.id

  let user: any;
  if (id) {
    user = await fetchUser(id)
  }


  return <main className="max-w-screen-xl mx-auto p-3">
    <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
      <Profile />

      {/* info  */}
      <div className="bg-gray-100/20 border border-gray-300 shadow-sm p-4 flex flex-col gap-4">
        <h4 className="text-center font-semibold underline">Info.</h4>
        <h4 className="flex items-center gap-2 text-sm">
          <span className="font-semibold">Mobile : </span>
          <span>{user?.profile?.mobile || "no data."}</span>
        </h4>
        <h4 className="flex items-center gap-2 text-sm">
          <span className="font-semibold">User Name : </span>
          <span>{user?.username || "no data."}</span>
        </h4>
        <h4 className="flex items-center gap-2 text-sm">
          <span className="font-semibold">Gender : </span>
          <span>{user?.profile?.gender || "no data."}</span>
        </h4>
      </div>
      {/* address info  */}
      <div className="bg-gray-100/20 border border-gray-300 shadow-sm p-4 flex flex-col gap-4">
        <h4 className="text-center font-semibold underline"> Address Info.</h4>
        <h4 className="flex items-center gap-2 text-sm">
          <span className="font-semibold">City : </span>
          <span>{user?.profile?.address?.city || "no data."}</span>
        </h4>
        <h4 className="flex items-center gap-2 text-sm">
          <span className="font-semibold">Street : </span>
          <span>{user?.profile?.address?.street || "no data."}</span>
        </h4>
        <h4 className="flex items-center gap-2 text-sm">
          <span className="font-semibold">ZipCode : </span>
          <span>{user?.profile?.address?.zipCode || "no data."}</span>
        </h4>
      </div>

      {/* delivery address  */}
      <div className="bg-gray-100/20 border border-gray-300 shadow-sm p-4 flex flex-col gap-4">
        <h4 className="text-center font-semibold underline"> Delivery Address.</h4>
        <h4 className="flex items-center gap-2 text-sm">
          <span className="font-semibold">Sate : </span>
          <span>{user?.profile?.deliveryAddress?.dcity || "no data"}</span>
        </h4>
        <h4 className="flex items-center gap-2 text-sm">
          <span className="font-semibold">Street : </span>
          <span>{user?.profile?.deliveryAddress?.dstreet || "no data"}</span>
        </h4>
        <h4 className="flex items-center gap-2 text-sm">
          <span className="font-semibold">zipCode : </span>
          <span>{user?.profile?.deliveryAddress?.dzipCode || "no data"}</span>
        </h4>
      </div>
    </section>
  </main>;
};

export default ProfilePage;
