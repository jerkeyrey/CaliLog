import SignIn from "./SignIn";
import UserDisplay from "@/components/UserDisplay";
import Link from "next/link";
import { auth } from "@/auth";
import { Book } from "lucide-react";

export default async function Navbar() {
  const session = await auth();

  return (
    <nav className="w-full bg-gray-800 text-white py-4 shadow-lg">
      <div className="container mx-auto flex items-center px-4 md:px-8">
        <Link
          href="/"
          className="text-2xl font-bold hover:text-gray-400 transition-colors"
        >
          CaliLog
        </Link>
        <div className="flex-grow" />
        <ul className="flex items-center">
          <li className="mr-8">
            <Link
              href="/diary"
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg transition-all duration-300 font-medium"
            >
              <Book size={18} />
              Diary
            </Link>
          </li>
          <li>{session?.user ? <UserDisplay /> : <SignIn />}</li>
        </ul>
      </div>
    </nav>
  );
}
