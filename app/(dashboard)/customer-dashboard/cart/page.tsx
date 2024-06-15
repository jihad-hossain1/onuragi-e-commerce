// "use client";

import CartQuantity from "@/components/Navbar/shopingCart/CartQuantity";
import RemoveFromCart from "@/components/Navbar/shopingCart/RemoveFromCart";
import { serverAuth } from "@/hooks/serverAuth";
import { fetchCart } from "@/utils/cart/fetchCart";
// import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { TbCurrencyTaka } from "react-icons/tb";

const CartPage = async () => {
  // const [carts, setCarts] = React.useState<any>();
  // const session = useSession();

  // useEffect(() => {
  //   (async () => {
  //     const cart = await fetch(
  //       `/api/v1/users/cart?userId=${session?.data?.user?.id}`
  //     );
  //     const data = await cart.json();
  //     if (data) {
  //       setCarts(data);
  //     }
  //   })();
  // }, [session?.data?.user?.id]);

  // console.log(carts);
  const authUser: any = await serverAuth();
  const carts = await fetchCart(authUser?.user?.id);
  // console.log("🚀 ~ CartPage ~ carts:", carts);
  return (
    <main className="max-w-screen-xl mx-auto p-4 min-h-[80vh]">
      <div className="flex flex-col gap-3">
        {carts?.result?.map((cart, index: number) => (
          <div
            key={index}
            className="border bg-slate-50 p-3 rounded shadow-sm hover:shadow flex justify-between gap-3"
          >
            <div className="flex flex-col gap-2">
              <h4>{cart?.productDetails?.name}</h4>

              <h4 className="flex items-center gap-1">
                <span className="font-semibold text-sm">Price: </span>
                <span className="text-sm">{cart?.productDetails?.price}</span>
                <TbCurrencyTaka />
              </h4>
              <CartQuantity
                quantity={cart?.quantity}
                id={cart?._id}
                productId={cart?.product}
                userId={cart?.userId}
              />
            </div>

            <div>
              <Image
                src={cart?.productDetails?.image}
                width={70}
                height={70}
                alt="product image"
              />
              <div>
                <RemoveFromCart
                  productId={cart?.product}
                  userId={cart?.userId}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* total price */}

      {carts?.result?.length > 0 && (
        <div className="flex flex-col gap-3 mt-10">
          <h4>Total items: {carts?.result?.length}</h4>
          <h4>
            Delivery charge: {carts?.result?.length < 3 ? 150 : 0}{" "}
            <span>৳</span>{" "}
            <span className="text-green-500 text-xs font-semibold">
              {" "}
              {`* Order Three items Gets Free Delivery *`}{" "}
            </span>{" "}
          </h4>
          <h4 className="text-lg font-semibold">Total: {carts?.totalPrice}</h4>
          <Link
            href="/customer-dashboard/cart/checkout"
            className="btn mt-3 w-fit text-xs"
          >
            Proceed to checkout
          </Link>
        </div>
      )}
      <div></div>

      {carts?.result?.length == 0 && (
        <div className="flex flex-col gap-3 items-center mt-10">
          <p className="text-center">No product in cart</p>
          <Link href="/products" className="btn mt-3 text-xs">
            Continue shopping
          </Link>
        </div>
      )}
    </main>
  );
};

export default CartPage;
