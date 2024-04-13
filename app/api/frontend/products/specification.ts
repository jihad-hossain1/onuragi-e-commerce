export async function getProductSpecification(id: string) {
  try {
    const response = await fetch(
      `${process.env.URL}/api/v1/products/specification/${id}`,
      {
        next: { tags: ["specification"] },
      }
    );

    if (!response.ok) {
      console.log("failed to fetched");
    }

    const data = await response.json();

    return data;
  } catch (error: any) {
    console.log(error);
  }
}
