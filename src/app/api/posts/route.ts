// src/app/api/posts/route.ts
import { NextResponse } from "next/server";
import { getPosts, addPost } from "@/data/posts";

type Body = { title?: unknown; content?: unknown };

function isString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

export async function GET() {
  try {
    const posts = getPosts();
    return NextResponse.json(posts);
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Failed to load posts" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Body;

    if (!isString(body.title) || !isString(body.content)) {
      return NextResponse.json(
        { error: "Missing or invalid title/content" },
        { status: 400 }
      );
    }

    // optional: length checks
    if (body.title.length > 200) {
      return NextResponse.json({ error: "Title too long" }, { status: 400 });
    }

    const newPost = addPost({
      title: body.title.trim(),
      content: body.content.trim(),
    });
    return NextResponse.json(newPost, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
}
