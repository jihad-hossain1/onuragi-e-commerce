
'use server';


export const serverAction = async (data) => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${data.id}`,
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...data }),
        }
    )

    const result = await response.json();

    return result;
}
