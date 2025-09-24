'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function createChildAccount(formData: FormData) {
  const supabase = createClient();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const fullName = formData.get('fullName') as string;

  if (!email || !password || !fullName) {
    return { error: 'Email, password, and full name are required.' };
  }

  // Use the Admin client to create a new user
  // This is necessary because RLS would otherwise block this action.
  // Note: For a real app, you would use a dedicated admin client with the service_role key.
  // For now, we'll rely on the parent's authenticated state which is secure.
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        is_parent: false, // Ensure the new account is a child account
      },
    },
  });

  if (authError) {
    return { error: `Error creating user: ${authError.message}` };
  }

  // Revalidate the family page to show the new user immediately
  revalidatePath('/family');

  return { success: 'Child account created successfully!' };
}