export async function fetchUser(id: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${id}`,
      {
        next: { tags: ["user"] },
      }
    );

    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
  }
}
