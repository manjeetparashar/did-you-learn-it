'use client';

import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function SignOutButton() {
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh(); // This reloads the page and clears the session
  };

  return (
    <button
      onClick={handleSignOut}
      className="px-4 py-2 font-semibold text-white bg-red-500 rounded-md hover:bg-red-600"
    >
      Sign Out
    </button>
  );
}