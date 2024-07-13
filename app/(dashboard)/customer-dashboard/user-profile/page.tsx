import React from "react";
import Profile from "./_compo/profile";
import { serverAuth } from "@/hooks/serverAuth";
import { fetchCart } from "@/utils/cart/fetchCart";
import Orders from "./_compo/orders";

const ProfilePage = async () => {
  const session: any = await serverAuth();

  let user: any;
  if (session) {
    user = await fetchCart(session?.user?.id);
  }

  return (
    <main className="max-w-screen-xl mx-auto p-3 ">
      <section className="grid  gap-3 ">
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
          <h4 className="text-center font-semibold underline">
            {" "}
            Address Info.
          </h4>
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
          <h4 className="text-center font-semibold underline">
            {" "}
            Delivery Address.
          </h4>
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
    </main>
  );
};

export default ProfilePage;
