import { serverAuth } from "@/hooks/serverAuth";
import { fetchUser } from "@/utils/users/fetchuser";
import AddressBook from "./_compo/AddressBook";
import Payment from "./_compo/Payment";
import { fetchCart } from "@/utils/cart/fetchCart";
import Image from "next/image";

const CheckoutPage = async () => {
  const session: any = await serverAuth();

  let initialValue = await fetchUser(session?.user?.id);

  const userAddress = initialValue?.profile;

  let initialCarts;
  if (initialValue) {
    initialCarts = await fetchCart(session?.user?.id);
  }

  const quantity = initialCarts?.result?.reduce(
    (acc, pre) => acc + pre?.quantity,
    0
  );

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
          <Payment
            userId={session?.user?.id}
            profileInfo={userAddress}
            total={initialCarts?.totalPrice}
          />
        </div>
      </div>

      {/* carts info:  */}
      <div className="mt-5 flex flex-col gap-2">
        {initialCarts?.result?.map((cart: any, index: number) => (
          <div
            key={index}
            className="border shadow-sm bg-slate-50 p-3 flex justify-between items-center"
          >
            <h4>{cart?.productDetails?.name}</h4>
            <p>{cart?.productDetails?.price}</p>
            <p>{cart?.quantity}</p>
            <div>
              <Image
                src={cart?.productDetails?.image}
                width={100}
                height={100}
                alt="photo"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end">
        <div>
          <h4 className=" font-semibold">
            Delivery Cost: {quantity >= 5 ? 0 : 120}
          </h4>
          <h4 className="font-semibold">
            Total:{" "}
            {quantity >= 5
              ? initialCarts?.totalPrice
              : initialCarts?.totalPrice + 120}{" "}
          </h4>
        </div>
      </div>
    </main>
  );
};

export default CheckoutPage;
