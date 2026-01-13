import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ouverjherohazwadfgud.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im91dmVyamhlcm9oYXp3YWRmZ3VkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI3MzYzNzIsImV4cCI6MjA3ODMxMjM3Mn0.jicjCmB_flZc_H_io0-v5fVHPzgf5gkj-4wdvcRXfQk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
