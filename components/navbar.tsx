import SignIn from "./SiginIn";
import UserDisplay from "@/components/UserDisplay";
import Link from "next/link";
import { auth } from "@/auth";

export default async function Navbar() {
  const session = await auth();

  return (
    <nav className="w-full bg-gray-800 text-white py-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-6">
        <h1 className="text-2xl font-bold">CaliLog</h1>
        <ul className="flex space-x-6">
          <li>
            <Link href="/" className="hover:text-gray-400">
              Home
            </Link>
          </li>
          <li>
            <Link href="/features" className="hover:text-gray-400">
              Features
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-gray-400">
              About
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-gray-400">
              Contact
            </Link>
          </li>
        </ul>
        <div className="flex items-center space-x-4">
          {session?.user ? <UserDisplay /> : <SignIn />}
        </div>
      </div>
    </nav>
  );
}
