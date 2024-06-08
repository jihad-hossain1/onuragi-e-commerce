'use server';

export const removeServerAction = async (data: { productId: string; userId: string }) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/cart`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data }),
    })

    const result = await response.json();

    return result;

}
