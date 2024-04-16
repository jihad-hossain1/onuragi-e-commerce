export async function getProducts() {
  try {
    const res = await fetch(`${process.env.URL}/api/v1/products`, {
      next: { tags: ["products"] },
    });
    // console.log(res);
    if (res.ok) {
      return await res.json();
    } else if (!res.ok) {
      throw new Error("Failed to fetch products");
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getProductById(id: string) {
  try {
    const res = await fetch(`${process.env.URL}/api/v1/products/${id}`, {
      next: { tags: ["product"] },
    });

    let result = await res.json();

    if (res.ok) {
      return result;
    } else if (!res.ok) {
      console.log("failed to fetch data");
    }
  } catch (error) {
    console.log(error);
  }
}
