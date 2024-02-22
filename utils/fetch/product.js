"use server";

import axios from "axios";

export const getAllCategory = async () => {
  try {
    const res = axios.get(
      `https://onuragi-handicarft.vercel.app/api/v1/category`
    );
    const result = (await res).data;
    // console.log(result);
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getSubCategories = async () => {
  try {
    const res = axios.get(
      `https://onuragi-handicarft.vercel.app/api/v1/category/subCategory`
    );
    const result = (await res).data;

    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const getProducts = async () => {
  try {
    const res = axios.get(
      `https://onuragi-handicarft.vercel.app/api/v1/products`
    );
    const result = (await res).data;

    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};
