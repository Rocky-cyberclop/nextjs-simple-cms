import { supabase } from "@/libs/supabase";

export type Post = {
  id: string;
  title: string;
  content: string;
  created_at?: string;
};

export async function getPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function getPostById(id: string): Promise<Post | null> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();
  if (error) return null;
  return data;
}

export async function addPost(post: Omit<Post, "id">): Promise<Post> {
  const { data, error } = await supabase
    .from("posts")
    .insert(post)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updatePost(
  id: string,
  dataToUpdate: Partial<Omit<Post, "id">>
): Promise<Post | null> {
  const { data, error } = await supabase
    .from("posts")
    .update(dataToUpdate)
    .eq("id", id)
    .select()
    .single();
  console.log(error);
  if (error) return null;
  return data;
}
