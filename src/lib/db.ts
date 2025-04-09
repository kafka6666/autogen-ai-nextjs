// This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
import { MongoClient, ServerApiVersion } from "mongodb";
 
if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

// Parse the MongoDB URI to handle possible encoding issues with the password
const uriString = process.env.MONGODB_URI;
let uri: string;

try {
  // Try to ensure password is correctly encoded
  const uriObj = new URL(uriString);
  // If there's an @ in the password, it needs special handling
  if (uriObj.password.includes('!') || uriObj.password.includes('@') || uriObj.password.includes('%')) {
    console.log("Special characters detected in password, ensuring proper encoding");    // Ensure proper encoding
    const encodedPassword = encodeURIComponent(decodeURIComponent(uriObj.password));
    uriObj.password = encodedPassword;
    uri = uriObj.toString();
  } else {
    uri = uriString;
  }
} catch (error) {
  console.error("Error parsing MongoDB URI:", error);
  uri = uriString; // Fallback to original
}

const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
}
 
let client: MongoClient;
 
// Test connection function
async function testConnection() {
  try {
    const testClient = new MongoClient(uri, options);
    await testClient.connect();
    await testClient.db("admin").command({ ping: 1 });
    console.log("✅ MongoDB connection successful!");
    await testClient.close();
    return true;
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    console.log("Connection URI (redacted):", uri.replace(/\/\/([^:]+):([^@]+)@/, "//[USERNAME]:[PASSWORD]@"));
    console.log("Please check:");
    console.log("1. Username and password are correct");
    console.log("2. IP address is whitelisted in MongoDB Atlas");
    console.log("3. Database name is correct");
    return false;
  }
}

// Immediately invoke to test connection
testConnection().catch(console.error);
 
if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  const globalWithMongo = global as typeof globalThis & {
    _mongoClient?: MongoClient
  }
 
  if (!globalWithMongo._mongoClient) {
    globalWithMongo._mongoClient = new MongoClient(uri, options)
  }
  client = globalWithMongo._mongoClient
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options)
}
 
// Export a module-scoped MongoClient. By doing this in a
// separate module, the client can be shared across functions.
export default client;