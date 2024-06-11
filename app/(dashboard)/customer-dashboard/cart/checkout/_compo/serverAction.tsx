'use server'

export const serverAction = async (info) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/payment`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...info })
    });

    const result = await response.json();

    return result;
}
