export async function getProducts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/products`, {
      next: { tags: ["products"] },
    });

    const data = await res.json();

    if (!res.ok) {
      console.log("filed to fetch!");
    }
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getProductById(id: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/products/${id}`, {
      next: { tags: ["product"] },
    });

    let result = await res.json();

    if (res.ok) {
      return result;
    } else if (!res.ok) {
      console.log("failed to fetch data product by id");
    }
  } catch (error) {
    console.log(error);
  }
}
