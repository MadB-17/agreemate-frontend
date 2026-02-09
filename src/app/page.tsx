"use client";

import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setResult("Analyzing image… please wait ⏳");

    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch("/api/detect-image", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      const probability =
        data?.type?.ai_generated?.probability;

      if (probability !== undefined) {
        const percent = Math.round(probability * 100);
        setResult(`🤖 Likely AI-generated: ${percent}%`);
      } else {
        setResult("⚠️ Could not determine if image is AI-generated.");
      }
    } catch (err) {
      setResult("❌ Error analyzing image.");
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-md text-center"
      >
        <h1 className="text-2xl font-bold mb-3">
          AI Image Detector
        </h1>

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setFile(e.target.files?.[0] || null)
          }
          className="mb-4"
        />

        <button
          type="submit"
          disabled={!file || loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg disabled:opacity-50"
        >
          {loading ? "Checking…" : "Check Image"}
        </button>

        {result && (
          <p className="mt-4 text-lg font-semibold text-gray-800">
            {result}
          </p>
        )}
      </form>
    </main>
  );
}
