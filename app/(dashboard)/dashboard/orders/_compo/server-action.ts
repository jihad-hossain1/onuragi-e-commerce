"use server";

export async function changeOrderStatus(info: any) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/orders/status-change`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...info }),
    }
  );

  const result = await response.json();

  return result;
}
