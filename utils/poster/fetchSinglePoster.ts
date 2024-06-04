"use server";

export async function fetchSinglePoster(id: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/banner/poster/${id}`,
    {
      next: { tags: ["poster"] },
    }
  );

  const result = await response.json();

  return result;
}
