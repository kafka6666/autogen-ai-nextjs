import { auth } from "@/auth";
import Image from "next/image";
import SignIn from "./SignIn";
import SignOut from "./SignOut";

const Header = async () => {
  const session = await auth();

  return (
    <div>
        {session?.user ? (
          <div className="flex flex-row gap-2">
            <p>{session.user.name}</p> | 
            <Image 
                src={session.user.image!} 
                alt={session.user.name!}
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