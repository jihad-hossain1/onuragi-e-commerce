"use client";

import React, { useEffect } from "react";
import AddressBook from "./_compo/AddressBook";
import Payment from "./_compo/Payment";
import { useSession } from "next-auth/react";

const CheckoutPage = () => {

  const { data: session, status } = useSession();

  const [user, setUser] = React.useState<any>();

  useEffect(() => {
    (async () => {
      const user = await fetch(`/api/v1/users/${session?.user?.id}`);
      const data = await user.json();
      if (data) {
        setUser(data);
      }
    })();
  }, [session?.user?.id]);

  const userAddress = user?.profile;
  return (
    <main className="max-w-screen-xl mx-auto p-4 min-h-[80vh]">
      <h4 className="text-center text-3xl font-semibold py-10">CheckoutPage</h4>

      <div className="grid md:grid-cols-2  gap-6">
        <div className="border shadow-sm bg-slate-50 p-3">
          <h4 className="text-center font-semibold">Address</h4>
          <AddressBook userInfo={userAddress} />
        </div>
        <div className="border shadow-sm bg-slate-50 p-3">
          <h4 className="text-center font-semibold">Payment method</h4>
          <Payment userId={session?.user?.id} />
        </div>
      </div>
    </main>
  );
};

export default CheckoutPage;
