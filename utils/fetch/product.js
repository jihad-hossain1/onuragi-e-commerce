export const getAllCategory = async () => {
  try {
    // if (typeof window == "undefined") {
    //   return [];
    // }
    const res = await fetch(`${process.env.URL}/api/v1/category`, {
      cache: "no-store",
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
    // if (typeof window == "undefined") {
    //   return [];
    // }
    const res = await fetch(`${process.env.URL}/api/v1/category/subCategory`, {
      cache: "no-store",
    });
    console.log(res);
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
export const getProducts = async () => {
  try {
    // if (typeof window == "undefined") {
    //   return [];
    // }
    const res = await fetch(`${process.env.URL}/api/v1/products`, {
      cache: "no-store",
    });
    if (res.ok) {
      return await res.json();
    } else if (!res.ok) {
      throw new Error("Failed to fetch products");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getProductById = async (id) => {
  try {
    const res = await fetch(`${process.env.URL}/products/${id}`, {
      cache: "no-store",
    });
    //
    if (res.ok) {
      return await res.json();
    } else if (!res.ok) {
      console.log(console.log(res));
    }
  } catch (error) {
    console.log(error);
  }
};