"use server";

export async function fetchOfferBanner() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/banner/offer-banner`,
    {
      next: { tags: ["offerBanner"] },
    }
  );
  const result = await response.json();

  return result;
}
