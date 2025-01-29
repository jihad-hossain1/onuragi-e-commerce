"use client";

import {
  Sheet,
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
import { Icons } from "@/components/ui/icons";

const ShopingCart = ({ carts }) => {
  const { data: session, status } = useSession();

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <div className="relative">
            <button>
              <Icons.cart size={20} />
            </button>

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
                        Tk.
                      </h4>

                      <div className="flex items-center gap-2">
                        <CartQuantity
                          quantity={cart?.quantity}
                          id={cart?._id}
                          productId={cart?.product}
                          userId={cart?.userId}
                        />
                        <RemoveFromCart
                          productId={cart?.product}
                          userId={cart?.userId}
                        />
                      </div>
                    </div>

                    <div>
                      <Image
                        src={cart?.productDetails?.image}
                        width={1000}
                        height={70}
                        alt="product image"
                        className="w-25 h-25 object-cover"
                      />
                      {/* <div className="mt-1">
                        <RemoveFromCart
                          productId={cart?.product}
                          userId={cart?.userId}
                        />
                      </div> */}
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
