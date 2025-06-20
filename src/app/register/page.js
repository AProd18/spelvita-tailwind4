"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError("Lozinke se ne poklapaju.");
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Greška pri registraciji.");
        return;
      }

      router.push("/login");
    } catch (err) {
      setError("Greška u mreži.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Registracija</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Korisničko ime <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[color:var(--color-laurel-green)]"
            required
            autoComplete="off"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Adresa e-pošte <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[color:var(--color-laurel-green)]"
            required
            autoComplete="off"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Lozinka <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[color:var(--color-laurel-green)]"
            required
          />
        </div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Potvrdi lozinku <span className="text-red-500">*</span>
        </label>
        <input
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[color:var(--color-laurel-green)]"
          required
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="bg-[color:var(--color-dark-olive)] text-[color:var(--color-cornsilk)] px-4 py-2 rounded hover:bg-opacity-90 hover:bg-[color:var(--color-cornsilk-dark)] hover:text-[color:var(--color-dark-olive)] cursor-pointer transition-all duration-300"
        >
          Registruj se
        </button>
      </form>
    </div>
  );
}
