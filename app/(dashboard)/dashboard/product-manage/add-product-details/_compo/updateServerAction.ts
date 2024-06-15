"use server";

export const update_server_action = async (info: any) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/products/product-details/${info?.detailId}`,
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
};
