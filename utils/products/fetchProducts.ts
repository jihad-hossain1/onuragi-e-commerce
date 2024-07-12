export async function fetchProducts() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/products`,
    {
      next: { tags: ["products"] },
    }
  );

  const data = await res.json();

  return data;
}
