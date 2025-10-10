// src/lib/server/appwrite.js
"use server";
import { Client, Account, Databases, Users } from "node-appwrite";
import { cookies } from "next/headers";

export async function createSessionClient() {
  const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;

  if (!endpoint || !projectId) {
    throw new Error("Missing required Appwrite environment variables for session client.");
  }
  const client = new Client()
    .setEndpoint(endpoint)
    .setProject(projectId);

  const session = await cookies().get("appwrite-session");
  if (!session || !session.value) {
    throw new Error("No session");
  }

  client.setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },
  };
}

export async function createAdminClient() {

  const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;
  const apiKey = process.env.NEXT_APPWRITE_KEY;

  if (!endpoint || !projectId || !apiKey) {
    throw new Error("Missing required Appwrite environment variables for admin client.");
  }

  const client = new Client()
    .setEndpoint(endpoint)
    .setProject(projectId)
    .setKey(apiKey);

  return {
    get account() {
      return new Account(client);
    },
    get database(){
      return new Databases(client)
    },
    get user(){
      return new Users(client)
    }
  };
}
