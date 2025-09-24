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

  // FIX: Removed 'authData' as it was unused
  const { error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        is_parent: false,
      },
    },
  });

  if (authError) {
    return { error: `Error creating user: ${authError.message}` };
  }

  revalidatePath('/family');

  return { success: 'Child account created successfully!' };
}