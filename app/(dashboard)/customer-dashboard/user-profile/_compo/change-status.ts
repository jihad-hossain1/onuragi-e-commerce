"use server";

export async function changeStatus(info: any) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/order?id=${info?.uid}`,
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
