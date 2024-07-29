'use server';

export async function addReview(info: any) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/products/reviews`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...info }),
    })

    const result = await response.json();

    return result;
}