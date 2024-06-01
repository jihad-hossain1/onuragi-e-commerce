import { useState, useEffect } from "react";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  // Add other relevant product fields
}

interface FetchProductsResponse {
  data: Product[];
  // Add other response fields if necessary
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(`${API_URL}/api/v1/products`, {
          next: { tags: ["products"] },
        });

        if (!res.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await res.json();
        setProducts(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return { products, loading, error };
}
