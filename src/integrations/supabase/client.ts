
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://grybouzjyydrvvjetdhx.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdyeWJvdXpqeXlkcnZ2amV0ZGh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2NTE3NzYsImV4cCI6MjA2MDIyNzc3Nn0.U5X1BMT_9TPOz-94tisrvAihJ0LcypH0z8bipLfOZ6Q";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
