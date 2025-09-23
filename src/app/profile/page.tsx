import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import ProfileForm from '@/components/ProfileForm';

export default async function ProfilePage() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // If the user is not logged in, redirect them to the login page
  if (!session) {
    redirect('/');
  }

  // Fetch the user's profile data
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single();

  if (error || !profile) {
    // Handle the case where the profile is not found
    return <div>Could not load profile. Please try again.</div>;
  }

  // The main layout from layout.tsx will wrap this page
  // We pass the fetched profile data to our form component
  return <ProfileForm profile={profile} />;
}