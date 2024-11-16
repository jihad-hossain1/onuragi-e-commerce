import axios from "axios"

export const token_set = async () => {
    const { data } = await axios.post(process.env.bkash_grant_token_url as string, {
        app_key: process.env.bkash_api_key,
        app_secret: process.env.bkash_secret_key,
    }, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            username: process.env.bkash_username,
            password: process.env.bkash_password,
        }
    })

    return data.id_token
}