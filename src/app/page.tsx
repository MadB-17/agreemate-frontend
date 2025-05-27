'use client';
import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult("");

    // TEMPORARY MOCK BACKEND
    setTimeout(() => {
      setResult("✅ AgreeMate Summary:\n- You agree to data sharing\n- You waive certain rights\n- Third parties may contact you");
      setLoading(false);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white p-6 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-center">AgreeMate</h1>
        <p className="text-gray-600 mb-6 text-center">
          Paste Terms of Service and get key points instantly.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste a ToS link or content..."
            className="border border-gray-300 rounded-lg p-3 resize-none min-h-[150px]"
          ></textarea>
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Scanning..." : "Scan"}
          </button>
        </form>

        <div className="mt-6">
          <h2 className="text-lg font-semibold">Results:</h2>
          <p className="text-sm text-gray-700 mt-2 whitespace-pre-wrap">
            {result || "(Result will appear here after scanning.)"}
          </p>
        </div>
      </div>

      <footer className="mt-10 text-sm text-gray-500">Made With Love By AGREEMATE Team</footer>
    </main>
  );
}
