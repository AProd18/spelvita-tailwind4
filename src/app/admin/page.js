// src/app/admin/page.js
"use client";

import { useEffect, useState } from "react";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    users: 0,
    orders: 0,
    availability: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, ordersRes, availabilityRes] = await Promise.all([
          fetch("/api/admin/users/count"),
          fetch("/api/admin/orders/count"),
          fetch("/api/availability"),
        ]);

        const usersData = await usersRes.json();
        const ordersData = await ordersRes.json();
        const availabilityData = await availabilityRes.json();

        setStats({
          users: usersData.count || 0,
          orders: ordersData.count || 0,
          availability: availabilityData.quantity || 0,
        });
      } catch (error) {
        console.error("Greška prilikom učitavanja statistike:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <p>Učitavanje statistike...</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-6">Admin statistika</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white rounded shadow p-6">
          <h2 className="text-lg font-semibold mb-2">
            👤 Registrovani korisnici
          </h2>
          <p className="text-3xl font-bold">{stats.users}</p>
        </div>

        <div className="bg-white rounded shadow p-6">
          <h2 className="text-lg font-semibold mb-2">🧾 Broj porudžbina</h2>
          <p className="text-3xl font-bold">{stats.orders}</p>
        </div>

        <div className="bg-white rounded shadow p-6">
          <h2 className="text-lg font-semibold mb-2">🌾 Dostupno tabli žita</h2>
          <p className="text-3xl font-bold">{stats.availability}</p>
        </div>
      </div>
    </div>
  );
}
