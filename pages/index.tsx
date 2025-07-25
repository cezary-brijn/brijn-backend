import { useState } from "react";
import CheckboxLegal from "../components/CheckboxLegal";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [legalAccepted, setLegalAccepted] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!file || !legalAccepted) return;
    const formData = new FormData();
    formData.append("file", file);
    setLoading(true);
    const res = await fetch("/api/analyze", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    setResult(data.feedback);
    setLoading(false);
  };

  return (
    <main className="p-6 max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">BRIJN – Psychological Analysis</h1>

      <input
        type="file"
        accept="image/*,text/plain"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      <CheckboxLegal onAccept={() => setLegalAccepted(true)} />

      <button
        className="bg-black text-white px-4 py-2 rounded disabled:opacity-50"
        onClick={handleSubmit}
        disabled={!file || !legalAccepted || loading}
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {result && (
        <div className="mt-4 p-4 bg-gray-100 border rounded">
          <h2 className="font-bold mb-2">Analysis Result:</h2>
          <pre className="whitespace-pre-wrap text-sm">{result}</pre>
        </div>
      )}
    </main>
  );
}

