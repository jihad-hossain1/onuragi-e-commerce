"use server";

export const posterServerAction = async (data: {
  title: string;
  image: string;
  productId: string;
}) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/banner/poster`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data }),
    }
  );

  const result = await response.json();

  return result;
};
