import axios from "axios";
import { headers } from 'next/headers';
import { NextResponse } from "next/server";

const bkash_auth = async () => {
    const header = headers();

    const id_token = header.get('id_token');

    try {
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
        });

        // Create a response and set the header with the id_token
        const response = NextResponse.json({ success: true, id_token: data.id_token });
        response.headers.set('id_token', data.id_token);
        
        return response;

    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}

export default bkash_auth;
