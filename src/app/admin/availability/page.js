"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export default function AdminAvailabilityPage() {
  const { data: session, status } = useSession();
  const [quantity, setQuantity] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (session?.user?.role === "admin") {
      fetch("/api/availability")
        .then((res) => res.json())
        .then((data) => setQuantity(data.quantity));
    }
  }, [session]);

  if (status === "loading") return <p>Učitavanje...</p>;
  if (!session || session.user.role !== "admin")
    return <p>Pristup dozvoljen samo adminima.</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback("");

    const res = await fetch("/api/availability", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity: parseInt(quantity, 10) }),
    });

    const data = await res.json();
    setLoading(false);
    setFeedback(data.message || "Ažurirano!");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Ažuriraj broj tabli žita</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          disabled={loading}
        >
          {loading ? "Čuvanje..." : "Sačuvaj"}
        </button>
        {feedback && <p className="text-sm text-green-700">{feedback}</p>}
      </form>
    </div>
  );
}
