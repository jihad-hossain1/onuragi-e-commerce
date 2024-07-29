export async function fetchReviews(id: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/products/reviews?id=${id}`, {
        next: { tags: ['reviews'] }
    });

    const result = await response.json();

    return result; 
}