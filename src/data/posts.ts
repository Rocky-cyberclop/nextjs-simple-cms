export type Post = {
  id: string; // string because uuid
  title: string;
  content: string;
};

const posts: Post[] = [];

export function getPosts(): Post[] {
  return posts;
}

export function addPost(post: Omit<Post, "id">): Post {
  const newPost: Post = { id: crypto.randomUUID(), ...post };
  posts.push(newPost);
  return newPost;
}
