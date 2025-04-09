"use client";

import { Button } from "./ui/button";
import { doSignInWithCredentials } from "@/actions";
import { useRouter } from "next/navigation";

const SignInForm = () => {
    const router = useRouter();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(e);

        try {
            const formData = new FormData(e.currentTarget);
            const response = await doSignInWithCredentials(formData);

            if (response?.error) {
                console.log(response.error);
            }
            router.push("/");
        } catch (error) {
            console.error(error);
        }
    }

  return (
    <form 
        className="container"
        onSubmit={handleSubmit}
    >
        <div 
            className="flex flex-col gap-2 mt-4"
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
                className="max-w-md border-gray-600 border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-sm p-2"
            />
        </div>
        <div 
            className="flex flex-col gap-2 mt-4"
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
                className="max-w-md border-gray-600 border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-sm p-2"
            />
        </div>
        <Button 
            className="bg-blue-700 text-white rounded-sm mt-4 max-w-md"
            type="submit"
        >
            Sign In
        </Button>
    </form>
  )
}

export default SignInForm;