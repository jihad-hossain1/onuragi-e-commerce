'use client'

import { useSession } from 'next-auth/react'
import React from 'react'
import { toast } from 'sonner'
import { addToCart } from './cart-serrver-action'
import { validatedTag } from '@/helpers/validated-tag'
import { useRouter } from 'next/navigation'
import Modal from "../Modal";
import Link from "next/link";

const AddToCart = ({
  id,
  className = "btn w-fit text-xs hover:transition-all duration-500",
  style = "",
  defaultColor = "",
  defaultSize = "",
}) => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [size, setSize] = React.useState(defaultSize);
  const [color, setColor] = React.useState(defaultColor);

  const handleAddToCart = async (productId: string) => {
    if (!session?.user) {
      setOpen(true);
      return;
    }

    try {
      setLoading(true);
      const response = await addToCart({
        productId: productId,
        quantity: 1,
        userId: session?.user?.id,
        size: size,
        color: color,
      });
      setLoading(false);


      if (response?.error) {
        setLoading(false);
        toast.error(response?.error, {
          position: "top-center",
          duration: 3000,
          style: {
            background: "red",
          },
        });
      }
      if (response?.result) {
        validatedTag("cart");
        setLoading(false);
        toast.success("Product added to cart", {
          position: "top-center",
          duration: 3000,
          style: {
            color: "green",
          }
        });
        router.refresh();
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <div>
      <button
        onClick={() => handleAddToCart(id)}
        className={` rounded px-2 text-pink-600 max-sm:text-xs`}
      >
        {loading ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path d="M12 2v4M12 18v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M2 12h4M18 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
          : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path d="M7 4V2h10v2M12 14l4-4h-3V3h-2v7H8l4 4z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M1 1h4l2 16h10l2-16h4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        }
      </button>

      <Modal
        title={"Authentication"}
        open={open}
        setOpen={setOpen}
        maxWidth={undefined}
      >
        <div className="flex flex-col gap-5">
          <p className="text-red-500 text-center">Please login first</p>
          <Link
            href="/login"
            className="bg-pink-600 text-white w-full py-2 rounded shadow hover:shadow-md transition-all duration-300 hover:bg-pink-700 px-4 text-center"
          >
            Login
          </Link>
          <Link
            href="/login/register"
            className="bg-pink-600 text-white w-full py-2 rounded shadow hover:shadow-md transition-all duration-300 hover:bg-pink-700 px-4 text-center"
          >
            Register
          </Link>
        </div>
      </Modal>
    </div>
  );
};

export default AddToCart