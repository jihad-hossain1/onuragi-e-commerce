"use server";

export async function fetchProducts() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/products`,
      {
        next: { tags: ["products"] },
      }
    );

    const data = await res.json();

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}
