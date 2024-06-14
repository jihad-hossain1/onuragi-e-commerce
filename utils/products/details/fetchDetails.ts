export async function fetchDetails(slug: string) {
  try {
    const details = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/products/product-details?slug=${slug}`,
      {
        next: { tags: ["productDetails"] },
      }
    );
    const result = await details.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}
