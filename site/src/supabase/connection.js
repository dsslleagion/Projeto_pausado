import { createClient } from '@supabase/supabase-js'


const supabaseUrl = "https://cvfggtwoyyhatnhuumla.supabase.co/"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2ZmdndHdveXloYXRuaHV1bWxhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkxMjQ4MzUsImV4cCI6MjAyNDcwMDgzNX0.J3gAiKHuVISlAc-gVolEYSVx-ADzsNIE2APAdGclcAY"; // Use a variável importada diretamente

export const supabase = createClient(supabaseUrl, supabaseKey)

export const urlupload = 'https://cvfggtwoyyhatnhuumla.supabase.co/storage/v1/object/public/'