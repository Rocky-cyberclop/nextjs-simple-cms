// data/posts.ts
export type Post = {
  id: number;
  title: string;
  content: string;
};

const posts: Post[] = [];

export function getPosts() {
  return posts;
}

export function addPost(post: Omit<Post, "id">) {
  const newPost = { id: Date.now(), ...post };
  posts.push(newPost);
  return newPost;
}
