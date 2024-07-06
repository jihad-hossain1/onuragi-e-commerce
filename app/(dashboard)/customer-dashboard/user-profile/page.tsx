"use client";

import React from "react";
import Profile from "./_compo/profile";
import { useSession } from "next-auth/react";

const ProfilePage = () => {
  // }
  const { data: session, status } = useSession();

  const [user, setUser] = React.useState<any>();
  React.useEffect(() => {
    (async () => {
      const user = await fetch(`/api/v1/users/${session?.user?.id}`);
      const data = await user.json();
      if (data) {
        setUser(data);
      }
    })();
  }, [session?.user?.id]);

  return (
    <main className="max-w-screen-xl mx-auto p-3 grid lg:grid-cols-4 gap-2">
      <section className="grid  gap-3 lg:col-span-1">
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

      {/* order info  */}
      <section className="lg:col-span-3">
        <div className="bg-gray-100/20 border border-gray-300 shadow-sm p-4 flex flex-col gap-4">
          <h4 className="text-center font-semibold underline">Order Info.</h4>
          <h4 className="flex items-center gap-2 text-sm">
            <span className="font-semibold">Total Order : </span>
            <span>{user?.deliveries?.length || "no data."}</span>
          </h4>
        </div>

        {/* order list  */}
        {user?.deliveries?.length > 0 ? (
          <div className="w-full overflow-x-scroll">
            <table className="overflow-x-scroll">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-b">No.</th>
                  <th className="px-4 py-2 border-b">Order Id</th>
                  <th className="px-4 py-2 border-b">Quantity</th>
                  <th className="px-4 py-2 border-b">Price</th>
                  <th className="px-4 py-2 border-b">Status</th>
                  <th className="px-4 py-2 border-b">Total</th>
                  <th className="px-4 py-2 border-b">Action</th>
                </tr>
              </thead>
              <tbody>
                {user?.deliveries?.map((delivery, index) => (
                  <tr key={delivery?._id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border-b text-center">
                      {index + 1}
                    </td>
                    <td className="px-4 py-2 border-b">{delivery?.did}</td>
                    <td className="px-4 py-2 border-b text-center">
                      {delivery?.products?.reduce(
                        (acc, pre) => acc + pre.quantity,
                        0
                      )}
                    </td>
                    <td className="px-4 py-2 border-b text-center">
                      {delivery?.products?.reduce(
                        (acc, pre) => acc + pre.quantity,
                        0
                      )}
                    </td>
                    <td className="px-4 py-2 border-b text-center">
                      {delivery?.status}
                    </td>
                    <td className="px-4 py-2 border-b text-center">
                      {delivery?.totalPrice}
                    </td>
                    <td className="px-4 py-2 border-b text-center">action</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex justify-center items-center min-h-[70svh]">
            <div className="flex flex-col gap-3 items-center">
              <h4 className="text-2xl font-semibold">No order found.</h4>
              <a href={"/products"} className="btn text-xs">
                Go to shop
              </a>
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default ProfilePage;
