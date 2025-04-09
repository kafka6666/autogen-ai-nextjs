import nextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import client from "@/lib/db";
import UserModel from "./models/user.model";
import dbConnect from "@/lib/dbConnect";

export const { handlers, signIn, signOut, auth } = nextAuth({
    adapter: MongoDBAdapter(client, {
        databaseName: process.env.NODE_ENV,
    }),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { type: "email" },
                password: { type: "password" },
            },
            async authorize(credentials) {
                if (!credentials.email || !credentials.password) {
                    console.log("Missing email or password");
                    return null;
                }

                // Connect to mongo db
                await dbConnect();
                console.log(`Attempting to find user with email: ${credentials.email}`);

                try {
                    // Make sure email comparison is case-insensitive
                    const normalizedEmail = (credentials.email as string).toLowerCase();
                    
                    // Find user in the database
                    const user = await UserModel.findOne({
                        email: { $regex: new RegExp(`^${normalizedEmail}$`, "i") }
                    });
                    
                    console.log(`User found: ${!!user}`);
                    
                    if (user) {
                        console.log("Checking password match");
                        // Direct comparison (normally should use bcrypt)
                        const isMatched = user.password === credentials.password;
                        console.log(`Password matched: ${isMatched}`);

                        if (isMatched) {
                            // Return user without sensitive info
                            const userObject = user.toObject();
                            // Delete password from the user object instead of destructuring
                            delete userObject.password;
                            return userObject;
                        } else {
                            throw new Error("Invalid credentials");
                        }
                    } else {
                        console.log("No user found with that email");
                        throw new Error("User not found");
                    }
                } catch (error) {
                    console.error("Authorization error:", error);
                    throw error;
                }
            },
        }),
    ],
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    secret: process.env.NEXTAUTH_SECRET,
});