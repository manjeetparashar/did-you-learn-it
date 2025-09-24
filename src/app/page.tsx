// src/app/page.tsx
import Auth from '@/components/Auth';
import SignOutButton from '@/components/SignOutButton';
import { createClient } from '@/lib/supabase/server';

export default async function Home() {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Auth />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Welcome Back!</h1>
      <p className="mt-2">You are now logged into the main application.</p>
      <div className="mt-4">
        <SignOutButton />
      </div>
    </div>
  );
}