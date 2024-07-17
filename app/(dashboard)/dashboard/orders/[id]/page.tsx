import { fetchOrder } from "@/utils/ecom-order/fetchOrder";
import React from "react";
import MangeOrder from "../_compo/MangeOrder";

const ManageOrder = async ({ params }) => {
  const order = await fetchOrder(params?.id);

  return (
    <div>
      <MangeOrder orderInfo={order?.result} />
    </div>
  );
};

export default ManageOrder;
