import React from "react";
import Orders from "../user-profile/_compo/orders";
import { serverAuth } from "@/hooks/serverAuth";
import { fetchCart } from "@/utils/cart/fetchCart";

const OrdersPage = async () => {
  const session: any = await serverAuth();

  let user: any;
  if (session) {
    user = await fetchCart(session?.user?.id);
  }
  return (
    <div className="px-3">
      {/* order info  */}
      <Orders orders={user?.orders} />
    </div>
  );
};

export default OrdersPage;
