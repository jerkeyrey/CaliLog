"use client";

import { useRouter } from "next/navigation";

export default function SignIn() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/signin")}
      className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg transition-all duration-300"
    >
      Sign In
    </button>
  );
}
