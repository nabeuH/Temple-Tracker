'use client';
import Link from 'next/link';
import Image from 'next/image';
import { signInWithGoogle, logout } from '../lib/auth';
import { useAuth } from '../lib/useAuth';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const user = useAuth(); // Get authenticated user
  const router = useRouter();

  const handleSignIn = async () => {
    const user = await signInWithGoogle();
    if (user) router.push('/my_temple'); // Redirect after login
  };

  const handleLogout = async () => {
    await logout();
    router.push('/'); // Redirect to home after logout
  };

  return (
    <nav className="fixed w-full top-0 py-3 bg-white border-b border-gray-300 z-50">
      <div className="w-full mx-auto px-2">
        <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4 sm:gap-0">
          {/* Logo & Home Link */}
          <Link href="/" className="pl-2 flex items-center gap-2">
            <div className="w-16 h-16 relative">
              <Image
                src="/images/logo.jpg"
                alt="Temple Tracker"
                fill
                sizes="(max-width: 640px) 64px, (max-width: 1024px) 128px, 160px"
                className="object-contain"
                priority
              />
            </div>
            <span className="text-xl pl-3 sm:text-2xl lg:text-3xl font-bold tracking-tight font-['Libre_Baskerville'] text-black">
              Temple Tracker
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-end gap-4 sm:gap-6 text-base sm:text-lg lg:text-xl font-['Libre_Baskerville']">
            <Link href="/about" className="text-black hover:text-orange-500">
              About
            </Link>
            {/* If NOT signed in → Show "About" & "Sign In with Google" */}
            {!user ? (
              <>
                <button onClick={handleSignIn} className="text-black hover:text-green-500">
                  Sign In with Google
                </button>
              </>
            ) : (
              <>
                {/* If signed in → Show "My Temple" & other pages */}
                <Link href="/my_temple" className="text-black hover:text-orange-500">
                  My Temple
                </Link>
                <Link href="/workouts" className="text-black hover:text-orange-500">
                  Workouts
                </Link>
                <Link href="/runs" className="text-black hover:text-orange-500">
                  Runs
                </Link>
                <Link href="/nutrition" className="text-black hover:text-orange-500">
                  Nutrition
                </Link>
                <Link href="/sleep" className="text-black hover:text-orange-500">
                  Sleep
                </Link>

                {/* Logout Button */}
                <button onClick={handleLogout} className="text-black hover:text-red-500">
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
