export async function fetchBanner() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/banner`,
      {
        next: { tags: ["banner"] },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    console.error(error?.message);
  }
}
