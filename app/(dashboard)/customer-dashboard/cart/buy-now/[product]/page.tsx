import React from "react";
import BackButton from "@/components/BackButton";
import { serverAuth } from "@/hooks/serverAuth";
import { fetchUser } from "@/utils/users/fetchuser";
import AddressBook from "../../checkout/_compo/AddressBook";
import Payment from "../../checkout/_compo/Payment";
import Authorized from "@/src/config/authorized";

const BuyNowPage = async ({ params }) => {
  const authUser: any = await serverAuth();

  let initialData;
  if (authUser) {
    initialData = await fetchUser(authUser?.user?.id);
  }

  return (
    <div className="max-w-screen-xl m-auto p-2">
      <BackButton />
      <Authorized>
        <div className="grid md:grid-cols-2  gap-6">
          <div className="border shadow-sm bg-slate-50 p-3">
            <h4 className="text-center font-semibold">Address</h4>
            <AddressBook userInfo={initialData?.profile} />
          </div>
          <div className="border shadow-sm bg-slate-50 p-3">
            <h4 className="text-center font-semibold">Payment method</h4>
            <Payment
              userId={initialData?.user?.id}
              profileInfo={initialData?.profile}
              total={0}
            />
          </div>
        </div>
      </Authorized>
    </div>
  );
};

export default BuyNowPage;
