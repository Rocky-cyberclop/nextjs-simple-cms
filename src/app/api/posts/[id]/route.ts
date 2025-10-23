import { NextResponse } from "next/server";
import { getPostById, updatePost } from "@/data/posts";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params; // 👈 await here!
  const post = await getPostById(id);

  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(post);
}

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params; // 👈 await here!
  const body = await req.json();
  if (!body.title && !body.content) {
    return NextResponse.json({ error: "Nothing to update" }, { status: 400 });
  }

  const updated = await updatePost(id, body);
  if (!updated)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(updated);
}
