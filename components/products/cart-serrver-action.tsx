'use server';

export const addToCart = async (cartInfo: any) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/cart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...cartInfo }),
        });

        const result = await response.json();

        return result;

    } catch (error) {
        console.log(error);
    }
}