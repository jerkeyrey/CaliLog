import { signIn } from "@/auth";

export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-white font-semibold shadow-md transition"
      >
        Sign In
      </button>
    </form>
  );
}
