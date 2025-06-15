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
        const checkRes = await fetch("/api/has-experience");
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
    <div className="max-w-md mx-auto mt-10 p-4 border rounded">
      <h1 className="text-xl font-bold mb-4">Login</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}
