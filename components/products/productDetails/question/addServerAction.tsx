"use server";

export const addQuestionServerAction = async (info: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/products/questions`,
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
};
