export async function getProductDetails(id: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/products/product-details/${id}`,
      {
        next: { tags: ["productDetails"] },
      }
    );

    if (!response.ok) {
      console.log("failed to fetched product details");
    }

    const data = await response.json();

    return data;
  } catch (error: any) {
    console.log(error);
  }
}
