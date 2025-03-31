"use client";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useAuth } from "../lib/useAuth";

export default function NewWorkout() {
  const user = useAuth(); // Get current user
  const [isOpen, setIsOpen] = useState(false);
  const [workout, setWorkout] = useState({
    name: "",
    type: "Strength",
    duration: "",
    date: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setWorkout({ ...workout, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert("You must be logged in to add a workout.");
      return;
    }

    try {
      await addDoc(collection(db, "users", user.uid, "workouts"), {
        ...workout,
        duration: Number(workout.duration),
        date: new Date(workout.date),
        createdAt: new Date(),
      });
      console.log("Workout added!");
      setIsOpen(false); // Close the modal
      setWorkout({ name: "", type: "Strength", duration: "", date: "" }); // Reset form
    } catch (error) {
      console.error("Error adding workout:", error);
    }
  };

  return (
    <div className="text-center">
      {/* Add Workout Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600"
      >
        Add Workout
      </button>

      {/* Workout Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">New Workout</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Workout Name"
                value={workout.name}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />

              <select
                name="type"
                value={workout.type}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="Strength">Strength</option>
                <option value="Cardio">Cardio</option>
                <option value="Flexibility">Flexibility</option>
              </select>

              <input
                type="number"
                name="duration"
                placeholder="Duration (minutes)"
                value={workout.duration}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />

              <input
                type="date"
                name="date"
                value={workout.date}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Save Workout
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}