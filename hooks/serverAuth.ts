import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export async function serverAuth() {
  const session = await getServerSession(options);

  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(session);
    }, 1000)
  );
}
