import UserProfileCard from "../components/user_profile_card";
export default function My_Temple() {
  return (
    <div className="mt-16 min-h-screen bg-[#1c0f0a] text-white p-6 flex flex-col items-center space-y-6">
      <div className="pt-8">
        <UserProfileCard />
      </div>
    </div>
  );
}