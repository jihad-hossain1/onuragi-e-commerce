import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function useCartItems() {
  const { data: session } = useSession();
  const [cartItems, setCartItem] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(
          `${API_URL}/api/v1/users/cart?userId=${session?.user?.id}`,
          {
            cache: "no-store",
          }
        );

        if (!res.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await res.json();
        setCartItem(data?.result);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [session?.user?.id]);

  return { cartItems, loading, error };
}
