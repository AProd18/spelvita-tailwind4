"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function VerifyEmailClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const [message, setMessage] = useState("Verifikacija u toku...");

  useEffect(() => {
    if (!token) {
      setMessage("Token nije pronađen.");
      return;
    }

    const verify = async () => {
      try {
        const res = await fetch(`/api/verify-email?token=${token}`);
        if (res.ok) {
          setMessage("Email uspešno verifikovan! Možete se sada prijaviti.");
          setTimeout(() => {
            router.push("/login");
          }, 3000);
        } else {
          const text = await res.text();
          setMessage(text);
        }
      } catch (err) {
        setMessage("Greška prilikom verifikacije.");
      }
    };

    verify();
  }, [token, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-6 rounded shadow text-center max-w-md mx-auto">
        <h1 className="text-xl font-bold mb-4">Verifikacija Email-a</h1>
        <p>{message}</p>
      </div>
    </div>
  );
}
