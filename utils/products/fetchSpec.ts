export const fetchSpec = async (id: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/products/specification?specId=${id}`,
      {
        next: { tags: ["specification"] },
      }
    );
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.error(error?.message);
  }
};
