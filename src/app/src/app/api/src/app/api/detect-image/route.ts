import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const image = formData.get("image");

    if (!image) {
      return NextResponse.json({ error: "No image uploaded" }, { status: 400 });
    }

    const sightengineForm = new FormData();
    sightengineForm.append("media", image as Blob);
    sightengineForm.append("models", "genai");
    sightengineForm.append("api_user", process.env.SIGHTENGINE_API_USER!);
    sightengineForm.append("api_secret", process.env.SIGHTENGINE_API_SECRET!);

    const response = await fetch("https://api.sightengine.com/1.0/check.json", {
      method: "POST",
      body: sightengineForm,
    });

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: "Detection failed" }, { status: 500 });
  }
}
