"use client";

import { Button } from "./ui/button";
import { doSignUp } from "@/actions";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

const SignUpForm = () => {
    const router = useRouter();
    const [error, setError] = useState("");
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        
        try {
            const formData = new FormData(e.currentTarget);
            
            // Basic validation
            const password = formData.get("password") as string;
            const confirmPassword = formData.get("confirmPassword") as string;
            
            if (password !== confirmPassword) {
                setError("Passwords don&apos;t match");
                return;
            }
            
            const response = await doSignUp(formData);

            if (response?.error) {
                setError(response.error);
                return;
            }
            
            // Redirect to sign in page on success
            router.push("/sign-in");
        } catch (error) {
            console.error(error);
            setError("Something went wrong. Please try again.");
        }
    }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Create an Account</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form 
          onSubmit={handleSubmit}
      >
          <div className="flex flex-col gap-2 mb-4">
              <label 
                  htmlFor="name"
              >
                  Full Name
              </label>
              <input 
                  type="text"
                  name="name"
                  id="name"
                  required
                  className="border-gray-300 border rounded-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
          </div>
          <div className="flex flex-col gap-2 mb-4">
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
          <div className="flex flex-col gap-2 mb-4">
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
          <div className="flex flex-col gap-2 mb-6">
              <label 
                  htmlFor="confirmPassword"
              >
                  Confirm Password
              </label>
              <input 
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  required
                  className="border-gray-300 border rounded-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
          </div>
          <Button 
              className="w-full bg-blue-700 text-white rounded-sm hover:bg-blue-800"
              type="submit"
          >
              Sign Up
          </Button>
      </form>
      
      <p className="mt-4 text-center text-gray-600">
        Already have an account?{" "}
        <Link href="/sign-in" className="text-blue-600 hover:underline">
          Sign In
        </Link>
      </p>
    </div>
  )
}

export default SignUpForm;
