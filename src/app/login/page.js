"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res.ok) {
      // pozovi API da proveri da li je korisnik već uneo iskustvo
      try {
        const checkRes = await fetch("/api/experience/has");
        const checkData = await checkRes.json();

        if (checkRes.ok && checkData.hasExperience) {
          router.push("/"); // već postoji iskustvo, idi na početnu
        } else {
          router.push("/add-experience"); // nema iskustva, idi na unos
        }
      } catch (err) {
        console.error("Greška prilikom provere iskustva:", err);
        router.push("/"); // fallback ako nešto pukne
      }
    } else {
      setError("Neispravan email ili lozinka.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h1 className="text-xl font-bold mb-4">Pristup nalogu</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Adresa e-pošte <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[color:var(--color-laurel-green)]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Lozinka <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[color:var(--color-laurel-green)]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="bg-[color:var(--color-dark-olive)] text-[color:var(--color-cornsilk)] px-4 py-2 rounded hover:bg-opacity-90 hover:bg-[color:var(--color-cornsilk-dark)] hover:text-[color:var(--color-dark-olive)] cursor-pointer w-full transition-all duration-300"
        >
          Ulaz
        </button>
        <div className="text-center text-sm mt-6">
          <p className="text-gray-700">
            Nemate nalog?
            <a
              href="/register"
              className="text-blue-600 font-medium hover:underline ml-1"
            >
              Registrujte se ovde
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}
