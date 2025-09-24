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
          // FIX: Disable the ESLint rule for this specific line
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return (cookieStore as any).get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          // FIX: Disable the ESLint rule for this specific line
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (cookieStore as any).set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          // FIX: Disable the ESLint rule for this specific line
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (cookieStore as any).delete({ name, ...options });
        },
      },
    }
  );
}