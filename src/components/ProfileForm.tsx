'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

// Define a type for the profile data for better TypeScript support
type Profile = {
  id: string;
  full_name: string | null;
  about_me: string | null;
  // Add other profile fields here as needed
};

export default function ProfileForm({ profile }: { profile: Profile }) {
  const router = useRouter();
  const [fullName, setFullName] = useState(profile.full_name || '');
  const [aboutMe, setAboutMe] = useState(profile.about_me || '');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: fullName,
        about_me: aboutMe,
        updated_at: new Date().toISOString(), // Update the timestamp
      })
      .eq('id', profile.id);

    if (error) {
      setMessage('Error updating profile: ' + error.message);
    } else {
      setMessage('Profile updated successfully!');
      // Refresh the page to show any new data
      router.refresh();
    }
    
    setLoading(false);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800">Edit Your Profile</h1>
      <form onSubmit={handleUpdateProfile} className="mt-6 space-y-4">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full max-w-lg px-3 py-2 mt-1 text-gray-900 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="aboutMe" className="block text-sm font-medium text-gray-700">
            About Me
          </label>
          <textarea
            id="aboutMe"
            value={aboutMe}
            onChange={(e) => setAboutMe(e.target.value)}
            rows={4}
            className="w-full max-w-lg px-3 py-2 mt-1 text-gray-900 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        </div>
      </form>
      {message && <p className="mt-4 text-gray-600">{message}</p>}
    </div>
  );
}