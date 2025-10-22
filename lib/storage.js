import { supabase } from "@/lib/supabaseClient";
const BUCKET_NAME = process.env.NEXT_PUBLIC_STORAGE_BUCKET;

const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl("image.png");

export const programmeImageUrl = data.publicUrl;
