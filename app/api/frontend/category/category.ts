export const getAllCategory = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/category`, {
      next: { tags: ["category"] },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }

    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getSubCategories = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/category/subCategory`, {
      next: { tags: ["subCategory"] },
    });
    // console.log(res);
    if (res.ok) {
      return await res.json();
    } else if (!res.ok) {
      throw new Error("Failed to fetch subcategories");
    }

    return await res.json();
  } catch (error) {
    throw new Error(error.message);
  }
};
