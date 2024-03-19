export const getAllCategory = async () => {
  try {
    // if (typeof window == "undefined") {
    //   return [];
    // }
    const res = await fetch(`${process.env.URL}/category`, {
      cache: "no-store",
    });
    if (!res.ok) {
      console.log(await res.json());
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
    const res = await fetch(`${process.env.URL}/category/subCategory`, {
      cache: "no-store",
    });
    if (!res.ok) {
      console.log(await res.json());
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
    const res = await fetch(`${process.env.URL}/products`, {
      cache: "no-store",
    });
    if (!res.ok) {
      console.log(await res.json());
    }

    return await res.json();
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
    if (!res.ok) {
      throw new Error("failed to fetch blog");
    }
    return res.json();
  } catch (error) {
    console.log(error);
  }
};