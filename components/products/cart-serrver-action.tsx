'use server';

export const addToCart = async (cartInfo: any) => {
    console.log("🚀 ~ addToCart ~ cartInfo:", cartInfo)
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/cart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...cartInfo }),
        });

        const result = await response.json();
        console.log("🚀 ~ addToCart ~ result:", result)

        return result;

    } catch (error) {
        console.log(error);
    }
}