"use client";

import { Button } from "./ui/button";
import { doSignInWithCredentials } from "@/actions";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

const SignInForm = () => {
    const router = useRouter();
    const [error, setError] = useState("");
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        try {
            const formData = new FormData(e.currentTarget);
            const response = await doSignInWithCredentials(formData);

            if (response?.error) {
                setError(response.error);
                return;
            }
            router.push("/");
        } catch (error) {
            console.error(error);
            setError("Invalid login credentials. Please try again.");
        }
    }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form 
          onSubmit={handleSubmit}
      >
          <div 
              className="flex flex-col gap-2 mb-4"
          >
              <label 
                  htmlFor="email"
              >
                  Email Address
              </label>
              <input 
                  type="email"
                  name="email"
                  id="email"
                  required
                  className="border-gray-300 border rounded-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
          </div>
          <div 
              className="flex flex-col gap-2 mb-6"
          >
              <label 
                  htmlFor="password"
              >
                  Password
              </label>
              <input 
                  type="password"
                  name="password"
                  id="password"
                  required
                  className="border-gray-300 border rounded-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
          </div>
          <Button 
              className="w-full bg-blue-700 text-white rounded-sm hover:bg-blue-800"
              type="submit"
          >
              Sign In
          </Button>
      </form>
      
      <p className="mt-4 text-center text-gray-600">
        Don&apos;t have an account?{" "}
        <Link href="/sign-up" className="text-blue-600 hover:underline">
          Sign Up
        </Link>
      </p>
    </div>
  )
}

export default SignInForm;