import { NextResponse } from "next/server";
import { getPosts, addPost } from "@/data/posts";

export async function GET() {
  try {
    const posts = await getPosts();
    return NextResponse.json(posts);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Unknown server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.title || !body.content) {
      return NextResponse.json(
        { error: "Missing title or content" },
        { status: 400 }
      );
    }
    const newPost = await addPost({ title: body.title, content: body.content });
    return NextResponse.json(newPost, { status: 201 });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Unknown server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
