'use client'

import { useSession } from 'next-auth/react'
import React from 'react'
import { toast } from 'sonner'
import { addToCart } from './cart-serrver-action'
import { validatedTag } from '@/helpers/validated-tag'
import { useRouter } from 'next/navigation'
import Modal from "../Modal";
import Link from "next/link";
import { FaCartArrowDown } from "react-icons/fa";
import { TbLoaderQuarter } from "react-icons/tb";

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
        {loading ? <TbLoaderQuarter className="animate-spin text-xl" /> : <FaCartArrowDown className="text-xl" />}
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