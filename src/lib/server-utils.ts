import { DEFAULT_UNAUTHENTICATED_REDIRECT } from "@/consts/routes";
import { getServerAuthSession } from "@/server/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function checkIfLoggedIn() {
  const headersList = headers();
  // read the custom x-url header
  const header_url = headersList.get("x-pathname");
  const session = await getServerAuthSession();
  if (!session) {
    redirect(`${DEFAULT_UNAUTHENTICATED_REDIRECT}?callbackUrl=${header_url}`);
  }
  return { session };
}
