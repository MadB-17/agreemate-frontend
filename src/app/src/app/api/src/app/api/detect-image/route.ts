export const runtime = "nodejs";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const incomingForm = await req.formData();
    const image = incomingForm.get("image");

    if (!image) {
      return NextResponse.json(
        { error: "No image received" },
        { status: 400 }
      );
    }

    const formData = new FormData();
    formData.append("media", image);
    formData.append("models", "genai");
    formData.append("api_user", process.env.SIGHTENGINE_API_USER as string);
    formData.append("api_secret", process.env.SIGHTENGINE_API_SECRET as string);

    const response = await fetch(
      "https://api.sightengine.com/1.0/check.json",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Detection failed" },
      { status: 500 }
    );
  }
}
