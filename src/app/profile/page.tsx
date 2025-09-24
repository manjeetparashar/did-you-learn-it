import { createClient } from '@/lib/supabase/server'; // <-- Updated import
import { redirect } from 'next/navigation';
import ProfileForm from '@/components/ProfileForm';

export default async function ProfilePage() {
  const supabase = createClient(); // <-- Updated client creation

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single();

  if (!profile) {
    return <div>Could not load profile. Please try again.</div>;
  }
  
  return <ProfileForm profile={profile} />;
}