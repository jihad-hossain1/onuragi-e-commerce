export async function fetchPosters() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/banner/poster`,
      {
        next: { tags: ["poster"] },
      }
    );

    const result = await response.json();

    return result;
  } catch (error: any) {
    console.error(error?.message);
  }
}
