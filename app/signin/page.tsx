"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

export default function SignIn() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="bg-gray-800 p-10 rounded-2xl shadow-2xl w-full max-w-md border border-gray-700">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome to CaliLog
          </h1>
          <p className="text-gray-400">
            Track your calories, achieve your goals
          </p>
        </div>

        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="w-full flex items-center justify-center gap-3 bg-gray-700 border border-gray-600 p-4 rounded-lg 
                     hover:bg-gray-600 transition-all duration-200 group"
        >
          <Image
            src="/google.svg"
            alt="Google logo"
            width={20}
            height={20}
            className="group-hover:scale-110 transition-transform"
          />
          <span className="text-gray-200 font-medium">
            Continue with Google
          </span>
        </button>
      </div>
    </div>
  );
}
