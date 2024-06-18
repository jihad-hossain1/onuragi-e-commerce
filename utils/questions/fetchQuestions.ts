export async function fetchQuestions(id: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/products/questions?id=${id}`,
    {
      next: { tags: ["question"] },
    }
  );

  const result = await response.json();

  return result;
}
