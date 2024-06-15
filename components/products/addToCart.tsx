'use client'

import { useSession } from 'next-auth/react'
import React from 'react'
import { toast } from 'sonner'
import { addToCart } from './cart-serrver-action'
import { validatedTag } from '@/helpers/validated-tag'
import { useRouter } from 'next/navigation'

const AddToCart = ({
  id,
  className = "btn w-fit text-xs hover:transition-all duration-500",
  style = "",
}) => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const handleAddToCart = async (productId: string) => {
    if (status === "unauthenticated") {
      toast.error("please login first");
      return;
    }

    try {
      setLoading(true);
      const response = await addToCart({
        productId: productId,
        quantity: 1,
        userId: session?.user?.id,
      });
      setLoading(false);

      if (response?.error) {
        setLoading(false);
        toast.error(response?.error);
      }
      if (response?.result) {
        validatedTag("cart");
        setLoading(false);
        toast.success(response?.message);
        router.refresh();
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <button
      onClick={() => handleAddToCart(id)}
      className={`${className} ${style}`}
    >
      {loading ? "loading..." : "Add to cart"}
    </button>
  );
};

export default AddToCart