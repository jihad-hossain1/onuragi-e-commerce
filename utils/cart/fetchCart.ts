"use server";

export async function fetchCart(userId: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/cart?userId=${userId}`,
      {
        next: { tags: ["cart"] },
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
