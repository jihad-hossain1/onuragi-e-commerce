"use server";

export async function payserver(info: any) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/cart/pay-confirm`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...info }),
    }
  );

  const result = await response.json();

  return result;
}
