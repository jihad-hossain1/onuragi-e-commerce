"use server";

export async function fetchSingleBanner(id: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/banner/${id}`,
      {
        next: { tags: ["banner"] },
      }
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}
