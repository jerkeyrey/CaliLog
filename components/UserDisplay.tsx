import SignOut from "@/components/SignOut";
import Image from "next/image";
import { auth } from "@/auth";

export default async function UserDisplay() {
  const session = await auth();

  if (!session?.user) return null;

  return (
    <div className="flex items-center space-x-4">
      {session.user.image && (
        <Image
          src={session.user.image}
          alt="Profile"
          width={40}
          height={40}
          className="rounded-full border-2 border-blue-500"
        />
      )}
      <SignOut />
    </div>
  );
}
