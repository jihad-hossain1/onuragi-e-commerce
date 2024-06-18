"use server";

export const updateServerAction = async (info: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/products/questions/${info?.qid}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...info }),
    }
  );
  const data = await response.json();
  return data;
};
