export const fetchCategories = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/category`,
    {
      next: { tags: ["category"] },
    }
  );

  const result = await res.json();

  return result;
};
