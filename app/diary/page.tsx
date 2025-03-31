import Navbar from "@/components/navbar";
import FoodDiary from "@/components/FoodDiary";

export default function DiaryPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <FoodDiary />
    </div>
  );
}
