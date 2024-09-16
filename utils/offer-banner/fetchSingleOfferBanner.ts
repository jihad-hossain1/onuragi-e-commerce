export async function fetchSingleOfferBanner(id: string) {
  try {
    const banner = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/banner/offer-banner/${id}`,
      {
        next: { tags: ["offerBanner"] },
      }
    );

    const result = await banner.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}
