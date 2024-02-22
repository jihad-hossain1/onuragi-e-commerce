"use server";

export const getAllCategory = async () => {
  try {
    const res = fetch(`${process.env.NEXT_BASE_URL}/category`);
    const result = (await res).json();

    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};
