"use server";

import { signIn, signOut } from "@/auth";
import UserModel from "@/models/user.model";
import dbConnect from "@/lib/dbConnect";

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

const doSignUp = async (formData: FormData) => {
  try {
    await dbConnect();
    
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;
    
    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return { error: "User already exists with this email" };
    }
    
    // Create new user
    const newUser = await UserModel.create({
      email,
      password, // In a production app, you'd hash this password
      name,
    });
    
    return { success: true, user: newUser };
  } catch (error) {
    console.error("Sign-up error:", error);
    return { error: "Failed to create user" };
  }
}

export { doSignOut, doSignIn, doSignInWithCredentials, doSignUp };