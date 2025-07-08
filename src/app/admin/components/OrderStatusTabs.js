"use client";

import { useState } from "react";
import OrderStatusSelect from "./OrderStatusSelect";
import DeleteOrderButton from "./DeleteOrderButton";

export default function OrderStatusTabs({ orders }) {
  const [statusFilter, setStatusFilter] = useState("pending");

  const filteredOrders = orders.filter(
    (order) => order.status === statusFilter
  );

  const tabs = [
    { key: "pending", label: "⏳ Na čekanju" },
    { key: "approved", label: "✅ Prihvaćeno" },
    { key: "denied", label: "❌ Odbijeno" },
  ];

  return (
    <div>
      <div className="flex gap-2 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setStatusFilter(tab.key)}
            className={`px-3 py-1 rounded ${
              statusFilter === tab.key
                ? "bg-[color:var(--color-dark-olive)] text-[color:var(--color-cornsilk)]"
                : "bg-gray-200 text-gray-800"
            } transition`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {filteredOrders.length === 0 ? (
        <p>Nema porudžbina za ovaj status.</p>
      ) : (
        <div className="overflow-x-auto whitespace-nowrap">
          <table className="w-full table-auto border border-gray-300 text-sm min-w-[900px]">
            <thead className="bg-[color:var(--color-dark-olive)] text-[color:var(--color-cornsilk)]">
              <tr>
                <th className="p-2 border">Korisnik</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Broj tabli</th>
                <th className="p-2 border">Drzava</th>
                <th className="p-2 border">Postanski broj</th>
                <th className="p-2 border">Grad</th>
                <th className="p-2 border">Adresa</th>
                <th className="p-2 border">Ime i prezime</th>
                <th className="p-2 border">Kontakt telefon</th>
                <th className="p-2 border">Napomena</th>
                <th className="p-2 border">Datum</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Obriši</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="text-center">
                  <td className="p-2 border">
                    <strong>{order.user?.name || "N/A"}</strong>
                  </td>
                  <td className="p-2 border">{order.user?.email || "N/A"}</td>
                  <td className="p-2 border">{order.quantity}</td>
                  <td className="p-2 border">{order.country}</td>
                  <td className="p-2 border">{order.postalCode}</td>
                  <td className="p-2 border">{order.city}</td>
                  <td className="p-2 border">{order.address}</td>
                  <td className="p-2 border">
                    <strong>{order.fullName}</strong>
                  </td>
                  <td className="p-2 border">{order.phone}</td>
                  <td className="p-2 border">
                    {order.note ? order.note : <em>-</em>}
                  </td>
                  <td className="p-2 border">
                    {new Date(order.createdAt).toLocaleString("sr-RS", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </td>
                  <td className="p-2 border">
                    <OrderStatusSelect
                      orderId={order.id}
                      currentStatus={order.status}
                    />
                  </td>
                  <td className="p-2 border">
                    <DeleteOrderButton orderId={order.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
