import { headers } from "next/headers";

const bkash_headers = async () => {
    return {
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization: headers().get("id_token"),
        "x-app-key": process.env.bkash_api_key,
    };
};

export default bkash_headers