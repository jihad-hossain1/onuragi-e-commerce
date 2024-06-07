'use server'



export const increaseQuantity = async (info: { id: string; productId: string; quantity: number, userId: string }) => {

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/cart/increase`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...info }),
    });

    const result = await response.json();

    return result;
}
