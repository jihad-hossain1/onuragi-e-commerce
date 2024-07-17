export async function fetchOrder(id: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/orders/${id}`,
    {
      next: { tags: ["order"] },
    }
  );
  const result = await response.json();
  return result;
}
