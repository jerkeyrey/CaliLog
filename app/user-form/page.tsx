import UserForm from "@/components/UserForm";
import Navbar from "@/components/navbar";

export default function UserFormPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <UserForm />
    </div>
  );
}
