import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function FamilyPage() {
  const supabase = createClient(); // FIX: Removed 'await' here

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('is_parent')
    .eq('id', session.user.id)
    .single();

  if (!profile?.is_parent) {
    redirect('/');
  }

  const { data: familyMembers } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: true });
    
  return (
    // ... The JSX for the page remains exactly the same
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Family Members</h1>
        <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
          + Add Child
        </button>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <ul role="list" className="divide-y divide-gray-200">
          {familyMembers?.map((member) => (
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
    </div>
  );
}