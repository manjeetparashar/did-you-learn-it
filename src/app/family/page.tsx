'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function FamilyPage() {
  const supabase = createClient();
  const [debugData, setDebugData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUserRole = async () => {
      // Step A: Get the currently logged-in user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (!user) {
        setDebugData({ error: 'User not found.', userError });
        setIsLoading(false);
        return;
      }

      // Step B: Try to fetch this user's profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*') // Select everything for debugging
        .eq('id', user.id)
        .single();
      
      // Step C: Display whatever we found
      setDebugData({
        user: user,
        profile: profile,
        profileError: profileError
      });
      setIsLoading(false);
    };

    checkUserRole();
  }, [supabase]);

  if (isLoading) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold">Debugging Family Page...</h1>
        <p>Loading data...</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Debug Information</h1>
      <p>This is the data the page received from Supabase:</p>
      <pre className="mt-4 p-4 bg-gray-100 rounded-md text-sm whitespace-pre-wrap">
        {JSON.stringify(debugData, null, 2)}
      </pre>
    </div>
  );
}