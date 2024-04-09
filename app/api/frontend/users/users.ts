export async function getUser(id: string) {
  try {
    const response = await fetch(`${process.env.URL}/api/v1/users/${id}`, {
      next: { tags: ["user"] },
    });

    const result = await response.json();

    if (!response.ok) {
      console.log(result.error);
    }

    return result;
  } catch (error) {
    console.log(error);
  }
}
