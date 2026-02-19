export const runtime = "nodejs";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const image = formData.get("image");

    if (!image) {
      return NextResponse.json(
        { error: "No image uploaded" },
        { status: 400 }
      );
    }

    const seForm = new FormData();
    seForm.append("media", image as Blob);
    seForm.append("models", "genai");
    seForm.append("api_user", process.env.SIGHTENGINE_API_USER!);
    seForm.append("api_secret", process.env.SIGHTENGINE_API_SECRET!);

    const seRes = await fetch(
      "https://api.sightengine.com/1.0/check.json",
      {
        method: "POST",
        body: seForm,
      }
    );

    const data = await seRes.json();

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: "Image detection failed" },
      { status: 500 }
    );
  }
}
