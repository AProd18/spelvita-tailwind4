"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function AdminOrdersPage() {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (session?.user?.role === "admin") {
      fetch("/api/admin/orders")
        .then((res) => res.json())
        .then((data) => {
          if (data.error) setError(data.error);
          else setOrders(data);
        })
        .catch(() => setError("Greška prilikom učitavanja porudžbina."))
        .finally(() => setLoading(false));
    }
  }, [session]);

  if (status === "loading") return <p>Učitavanje...</p>;
  if (!session || session.user.role !== "admin")
    return <p>Pristup dozvoljen samo adminima.</p>;

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6 text-[color:var(--color-dark-olive)]">
        Sve porudžbine
      </h1>

      {loading ? (
        <p>Učitavanje porudžbina...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : orders.length === 0 ? (
        <p>Trenutno nema porudžbina.</p>
      ) : (
        <table className="w-full table-auto border border-gray-300 text-sm">
          <thead className="bg-[color:var(--color-dark-olive)] text-[color:var(--color-cornsilk)]">
            <tr>
              <th className="p-2 border">Korisnik</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Broj tabli</th>
              <th className="p-2 border">Telefon</th>
              <th className="p-2 border">Adresa</th>
              <th className="p-2 border">Napomena</th>
              <th className="p-2 border">Datum</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="text-center">
                <td className="p-2 border">{order.user?.name || "N/A"}</td>
                <td className="p-2 border">{order.user?.email || "N/A"}</td>
                <td className="p-2 border">{order.quantity}</td>
                <td className="p-2 border">{order.phone}</td>
                <td className="p-2 border">{order.address}</td>
                <td className="p-2 border">
                  {order.note ? order.note : <em>-</em>}
                </td>
                <td className="p-2 border">
                  {new Date(order.createdAt).toLocaleString("sr-RS", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
