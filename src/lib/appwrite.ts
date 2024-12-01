import "server-only";
import { Client, Account, Databases } from "node-appwrite";
import { cookies } from "next/headers";
import { AUTH_COOKIE } from "@/features/auth/constants";

export async function createSessionClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);
  const cookieStore = await cookies();
  const session = cookieStore.get(AUTH_COOKIE);

  if (!session || !session.value) {
    throw new Error("Unauthorized.");
  }

  client.setSession(session.value);
  const account = new Account(client);
  const databases = new Databases(client);

  return { account, databases };
}

export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
    .setKey(process.env.NEXT_APPWRITE_KEY!);

  const account = new Account(client);
  return account;
}
