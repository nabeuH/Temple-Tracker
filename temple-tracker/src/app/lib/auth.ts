import { auth, googleProvider, db } from "./firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { doc, getDoc, setDoc, collection, addDoc } from "firebase/firestore";

// Google Sign-In and Store User in Firestore
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    if (user) {
      // Reference to the user's document in Firestore
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      // If user does not exist in Firestore, create a new document
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          name: user.displayName || "Unnamed User",
          email: user.email,
          photoURL: user.photoURL,
          createdAt: new Date(),
        });
        console.log("New user added to Firestore!");

        // ✅ Create Initial Subcollections for User
        await initializeUserCollections(user.uid);
      } else {
        console.log("User already exists in Firestore.");
      }
    }

    return user;
  } catch (error) {
    console.error("Google Sign-In Error:", error);
  }
};

// ✅ Function to Create Default Subcollections
const initializeUserCollections = async (uid: string) => {
  try {
    // Reference to user's subcollections
    const workoutRef = collection(db, "users", uid, "workouts");
    const runRef = collection(db, "users", uid, "runs");
    const nutritionRef = collection(db, "users", uid, "nutrition");
    const sleepRef = collection(db, "users", uid, "sleep");

    // ✅ Add Sample Document to Each Subcollection to Ensure It Exists
    await addDoc(workoutRef, {
      name: "Sample Workout",
      date: new Date(),
      type: "Strength",
      duration: 30, // in minutes
    });

    await addDoc(runRef, {
      distance: 3, // in miles
      time: "25:00",
      caloriesBurned: 300,
      date: new Date(),
    });

    await addDoc(nutritionRef, {
      meal: "Sample Meal",
      calories: 500,
      protein: 30, // in grams
      date: new Date(),
    });

    await addDoc(sleepRef, {
      duration: 7, // in hours
      quality: "Good",
      date: new Date(),
    });

    console.log("User subcollections initialized successfully.");
  } catch (error) {
    console.error("Error initializing user collections:", error);
  }
};

// Logout Function
export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Sign-Out Error:", error);
  }
};