"use client";

import { useState } from "react";

export default function Home() {
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
  };

  return (
    <main style={{ minHeight: "100vh", padding: 20, textAlign: "center" }}>
      <h1>Is this real… or AI?</h1>
      <p>Upload an image to check if it was AI-generated.</p>

      <input type="file" accept="image/*" onChange={handleImageUpload} />

      {preview && (
        <div style={{ marginTop: 20 }}>
          <img src={preview} alt="Preview" style={{ maxWidth: "300px" }} />
        </div>
      )}

      <button style={{ marginTop: 20 }}>Check Image</button>
    </main>
  );
}
