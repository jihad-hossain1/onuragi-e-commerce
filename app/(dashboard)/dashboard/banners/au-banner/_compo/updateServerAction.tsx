"use server";

export const updateServerAction = async (updateData: {
  _id: string;
  title: string;
  image: string;
  productId: string;
}) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/banner/${updateData?._id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...updateData }),
    }
  );

  const result = await response.json();

  return result;
};
