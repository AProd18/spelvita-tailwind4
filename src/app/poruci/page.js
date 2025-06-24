"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OrderPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [fullName, setFullName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quantity,
          note,
          phone,
          address,
          postalCode,
          city,
          fullName,
          country,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Greška prilikom slanja.");

      setSuccess("Porudžbina uspešno poslata!");
      setQuantity(1);
      setNote("");
      setCountry("");
      setPostalCode("");
      setCity("");
      setFullName("");
      setPhone("");

      setTimeout(() => {
        router.push("/");
      }, 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") return <p>Učitavanje...</p>;
  if (!session) return <p>Prijavi se da bi poručio proizvod.</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow space-y-6">
      <h1 className="text-2xl font-bold text-[color:var(--color-dark-olive)]">
        Poruči Elixir od spelte
      </h1>

      <div className="border p-4 rounded bg-[color:var(--color-cornsilk)] text-[color:var(--color-dark-olive)]">
        <p>
          <strong>Proizvod:</strong> 1 tabla spelte (28 kocki)
        </p>
        <p>
          <strong>Cena:</strong> 1500 RSD po tabli
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">
            Količina (broj tabli)
          </label>
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <h2 className="text-lg font-semibold mt-6 mb-2">Adresa isporuke</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Država *</label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full border rounded p-2"
              required
            >
              <option value="">Izaberi državu</option>
              <option value="Srbija">Srbija</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1">Poštanski broj *</label>
            <input
              type="text"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              className="w-full border rounded p-2"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Grad *</label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full border rounded p-2"
              required
            >
              <option value="">Izaberi grad</option>
              <option value="Beograd">Beograd</option>
              <option value="Pančevo">Pančevo</option>
              <option value="Vršac">Vršac</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1">Adresa *</label>
            <input
              type="text"
              value={address} // address nije u state, treba dodati!
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border rounded p-2"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Ime i prezime *</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full border rounded p-2"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">
              Kontakt telefon *
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border rounded p-2"
              required
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold mb-1">Napomena (opciono)</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full border rounded p-2"
            rows={3}
          />
        </div>

        {error && <p className="text-red-600">{error}</p>}
        {success && <p className="text-green-600">{success}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[color:var(--color-dark-olive)] text-[color:var(--color-cornsilk)] font-semibold py-2 px-4 rounded hover:bg-[color:var(--color-laurel-green)] transition"
        >
          {loading ? "Slanje..." : "Pošalji porudžbinu"}
        </button>
      </form>
    </div>
  );
}
