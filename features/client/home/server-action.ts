'use server'

export async function fetchHomePage() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/common/homepage`, {
      cache: "no-store",
    });
    const data = await res.json();

    if (data?.result) return data?.result;

    return {
      babyProducts: [],
      girlsProducts: [],
      boysProducts: [],
      handicraft: [],
      womenProducts: [],
      banner: [],
    }
  } catch (error: any) {
    console.error(error?.message);
  }
}
