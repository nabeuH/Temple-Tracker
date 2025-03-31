"use client";
import { useAuth } from "../lib/useAuth";

export default function UserProfileCard() {
  const user = useAuth(); // Get user data

  if (!user) return null; // Prevents errors if user is not logged in

  return (
    <div className="p-6 bg-white text-black rounded-lg shadow-lg flex items-center gap-6 w-full max-w-lg mx-auto border border-gray-300">
      <img 
        src={user.photoURL || "/default-avatar.png"} 
        alt="User Avatar" 
        className="w-20 h-20 rounded-full border-2 border-gray-500"
      />
      <div>
        <h2 className="text-2xl font-bold">{user.displayName}</h2>
        <p className="text-gray-600">{user.email}</p>
      </div>
    </div>
  );
}