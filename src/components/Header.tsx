import { auth } from "@/auth";
import Image from "next/image";
import SignIn from "./SignIn";
import SignOut from "./SignOut";

// Helper function to check if a URL is valid
const isValidUrl = (url: string | null | undefined): boolean => {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const Header = async () => {
  const session = await auth();
  // Get valid image URL or use default
  const imageUrl = session?.user?.image && isValidUrl(session.user.image) 
    ? session.user.image 
    : "/default-avatar.svg";

  return (
    <div>
        {session?.user ? (
          <div className="flex flex-row gap-2">
            <p>{session.user.name}</p> | 
            <Image 
                src={imageUrl} 
                alt={session.user.name || "User"}
                width={40} 
                height={40} 
                className="rounded-full"
            /> | 
            <p>{session.user.email}</p> | 
            <SignOut />
          </div>
        ) : (
          <SignIn />
        )}
    </div>
  )
}

export default Header;