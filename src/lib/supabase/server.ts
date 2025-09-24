import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

export function createClient() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          // FIX: Use a type assertion to work around the Next.js v15 type issue
          return (cookieStore as any).get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          // FIX: Use a type assertion here as well
          (cookieStore as any).set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          // FIX: Use a type assertion here as well
          (cookieStore as any).delete({ name, ...options });
        },
      },
    }
  );
}