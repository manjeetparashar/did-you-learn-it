"use client";

import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    "https://nppypctfuoldyiztzljt.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5wcHlwY3RmdW9sZHlpenR6bGp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc3NzI2OTcsImV4cCI6MjA3MzM0ODY5N30.GW2Fa8wNPA9c3srDrIrtih4fYGOBwllty3CsyslP6pQ"
  )
}