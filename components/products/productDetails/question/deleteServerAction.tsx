"use server";

export const deleteServerAction = async (info: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/products/questions/${info?.id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...info }),
    }
  );

  const data = response.json();
  return data;
};
