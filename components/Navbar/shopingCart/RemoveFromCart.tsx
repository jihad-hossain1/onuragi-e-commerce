"use client";

import { validatedTag } from "@/helpers/validated-tag";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import { removeServerAction } from "./removeServerAction";
import { Icons } from "@/components/ui/icons";

const RemoveFromCart = ({ productId, userId }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRemoveFromCart = async () => {
    try {
      setLoading(true);
      const response = await removeServerAction({
        productId: productId,
        userId: userId,
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
      console.error(error);
    }
  };
  return (
    <div className="mt-1">
      <button className="p-1" onClick={handleRemoveFromCart} disabled={loading}>
        {loading ? (
          <Icons.loading className="animate-spin" size={20} strokeColor="red" />
        ) : (
          <Icons.trash size={20} strokeColor="red" />
        )}
      </button>
    </div>
  );
};

export default RemoveFromCart;
