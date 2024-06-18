"use server";

export async function deleteReplyAction(info: any) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/products/questions/replies/${info.id}`,
    {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...info }),
    }
  );

  const result = await response.json();

  return result;
}
