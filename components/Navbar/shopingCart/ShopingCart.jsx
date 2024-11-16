"use client";

import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useSession } from "next-auth/react";
import Link from "next/link";
import CartQuantity from "./CartQuantity";
import Image from "next/image";
import RemoveFromCart from "./RemoveFromCart";

const ShopingCart = ({ carts }) => {
  const { data: session, status } = useSession();

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <div className="relative">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <path d="M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM8 2v2h8V2H8z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

            {carts?.length > 0 && (
              <div className="w-5 h-5 rounded-full bg-red-500 text-white text-xs flex justify-center items-center absolute md:top-0 md:right-0 max-sm:left-0 max-sm:top-0 max-sm:right-1/2  translate-x-1/2 -translate-y-1/2">
                {carts?.length}
              </div>
            )}
          </div>
        </SheetTrigger>
        {status == "unauthenticated" ? (
          <SheetContent>
            <SheetTitle>You need to login</SheetTitle>
            <SheetFooter>
              <Link href="/login" className="btn">
                Login
              </Link>
            </SheetFooter>
          </SheetContent>
        ) : (
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Cart Information</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when you re done.
              </SheetDescription>
              <div
                className={`flex flex-col gap-3 max-h-[400px] overflow-y-auto`}
              >
                {carts?.map((cart, index) => (
                  <div
                    key={index}
                    className="border bg-slate-50 p-3 rounded shadow-sm hover:shadow flex justify-between gap-3"
                  >
                    <div className="flex flex-col gap-2">
                      <h4>{cart?.productDetails?.name}</h4>

                      <h4 className="flex items-center gap-1">
                        <span className="font-semibold text-sm">Price: </span>
                        <span className="text-sm">
                          {cart?.productDetails?.price}
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <path d="M14 2H6c-1.1 0-1.99.89-1.99 2L4 20c0 1.1.89 2 1.99 2h8c1.1 0 1.99-.89 1.99-2V4c0-1.1-.89-2-1.99-2zM8 16h2v2H8zm0-4h2v2H8zm4 4h2v2h-2zm0-4h2v2h-2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

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

              {carts?.length == 0 && (
                <div className="flex flex-col gap-3 items-center mt-10">
                  <p className="text-center">No product in cart</p>
                  <Link href="/products" className="btn mt-3 text-xs">
                    Continue shopping
                  </Link>
                </div>
              )}
            </SheetHeader>

            {carts?.length > 0 && (
              <SheetFooter className={"mt-4"}>
                <Link
                  href="/customer-dashboard/cart"
                  className="btn text-xs w-fit"
                >
                  Go to Cart
                </Link>
              </SheetFooter>
            )}
          </SheetContent>
        )}
      </Sheet>
    </>
  );
};

export default ShopingCart;
