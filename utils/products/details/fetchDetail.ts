export async function fetchDetail(id: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/products/product-details/${id}`,
    {
      cache: "no-store",
    }
  );
  const result = await response.json();
  return result;
}
