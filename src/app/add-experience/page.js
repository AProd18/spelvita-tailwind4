"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AddExperiencePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [form, setForm] = useState({
    fullName: "",
    location: "",
    message: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.fullName || !form.location || !form.message) {
      setError("Sva polja su obavezna.");
      return;
    }

    try {
      const res = await fetch("/api/experience/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Došlo je do greške.");
        return;
      }

      setSuccess("Iskustvo uspešno dodato!");
      setTimeout(() => {
        router.push("/");
      }, 3000); // Redirect na glavnu stranicu
    } catch (err) {
      setError("Greška na mreži.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center text-[#5F6F52]">
        Dodaj svoje iskustvo
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="fullName"
          placeholder="Ime i prezime"
          value={form.fullName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="location"
          placeholder="Lokacija (npr. Beograd)"
          value={form.location}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="message"
          placeholder="Podeli svoje iskustvo"
          value={form.message}
          onChange={handleChange}
          className="w-full p-2 border rounded h-32"
          required
        />
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-600">✅{success}</p>}
        <button
          type="submit"
          className="w-full bg-[color:var(--color-dark-olive)] text-[color:var(--color-cornsilk)] py-2 rounded hover:bg-opacity-90 hover:bg-opacity-90 hover:bg-[color:var(--color-cornsilk-dark)] hover:text-[color:var(--color-dark-olive)] cursor-pointer"
        >
          Pošalji
        </button>
      </form>
    </div>
  );
}
