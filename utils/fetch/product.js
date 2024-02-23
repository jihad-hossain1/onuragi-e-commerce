"use server";

import axios from "axios";

export const getAllCategory = async () => {
  try {
    const res = axios.get(`${process.env.NEXT_BASE_URL}/category`);
    const result = (await res).data;
    // console.log(result);
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getSubCategories = async () => {
  try {
    const res = axios.get(`${process.env.NEXT_BASE_URL}/category/subCategory`);
    const result = (await res).data;

    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const getProducts = async () => {
  try {
    const res = axios.get(`${process.env.NEXT_BASE_URL}/products`);
    const result = (await res).data;

    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};
