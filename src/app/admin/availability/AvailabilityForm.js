"use client";

import { useState } from "react";

export default function AvailabilityForm({ initialQuantity }) {
  const [quantity, setQuantity] = useState(initialQuantity);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");

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
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-[color:var(--color-dark-olive)] text-[color:var(--color-cornsilk)] py-3 px-6 rounded hover:bg-opacity-90 transition-all duration-300"
      >
        {loading ? "Čuvanje..." : "Sačuvaj"}
      </button>
      {feedback && <p className="text-sm text-green-700">{feedback}</p>}
    </form>
  );
}
