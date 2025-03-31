"use client";

import { signOut } from "next-auth/react";

export default function SignOut() {
  return (
    <button
      onClick={() => signOut()}
      className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white font-semibold shadow-md transition"
    >
      Sign Out
    </button>
  );
}