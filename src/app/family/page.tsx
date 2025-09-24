'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation'; // FIX: Import useRouter
import AddChildModal from '@/components/AddChildModal';

type FamilyMember = {
  id: string;
  full_name: string | null;
  is_parent: boolean;
};

export default function FamilyPage() {
  const supabase = createClient();
  const router = useRouter(); // FIX: Initialize the router
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUserAndFetchFamily = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/'); // FIX: Use router.push for navigation
        return;
      }
      
      const { data: profile } = await supabase
        .from('profiles')
        .select('is_parent')
        .eq('id', user.id)
        .single();

      if (!profile?.is_parent) {
        router.push('/'); // FIX: Use router.push for navigation
        return;
      }

      const { data: familyData } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: true });

      if (familyData) {
        setFamilyMembers(familyData);
      }
      setIsLoading(false);
    };

    checkUserAndFetchFamily();
  }, [supabase, router]); // Add router to the dependency array

  if (isLoading) {
    return <div>Loading family data...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Family Members</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          + Add Child
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <ul role="list" className="divide-y divide-gray-200">
          {familyMembers.map((member) => (
            <li key={member.id} className="px-6 py-4 flex items-center justify-between">
              <span className="font-medium text-gray-900">{member.full_name || 'Unnamed Member'}</span>
              {member.is_parent ? (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Parent
                </span>
              ) : (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Child
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>

      {isModalOpen && <AddChildModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}