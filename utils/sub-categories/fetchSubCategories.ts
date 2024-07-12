export const fetchSubCategories = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/category/subCategory`,
    {
      next: { tags: ["subCategory"] },
    }
  );

  const result = await res.json();

  return result;
};
