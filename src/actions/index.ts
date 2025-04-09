"use server";

import { signIn, signOut } from "@/auth";

const doSignIn = async () => {
  await signIn("google", {
    callbackUrl: "http://localhost:3000",
  });
}
const doSignOut = async () => {
  await signOut();
}

const doSignInWithCredentials = async (formData: FormData) => {
  try {
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export { doSignOut, doSignIn, doSignInWithCredentials };