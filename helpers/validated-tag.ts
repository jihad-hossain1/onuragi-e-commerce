"use server";

import { revalidateTag } from "next/cache";

export async function validatedTag(tag: string) {
  return revalidateTag(tag);
}
