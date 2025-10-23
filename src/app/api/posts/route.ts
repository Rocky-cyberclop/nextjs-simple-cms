import { NextResponse } from "next/server";
import { getPosts, addPost } from "@/data/posts";

export async function GET() {
  return NextResponse.json(getPosts());
}

export async function POST(req: Request) {
  const body = await req.json();
  if (!body.title || !body.content) {
    return NextResponse.json({ error: "Missing title or content" }, { status: 400 });
  }
  const newPost = addPost({ title: body.title, content: body.content });
  return NextResponse.json(newPost, { status: 201 });
}
