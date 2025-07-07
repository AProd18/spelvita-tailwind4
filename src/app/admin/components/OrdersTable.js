"use client";

import { useState } from "react";
import OrderStatusSelect from "./OrderStatusSelect";
import DeleteOrderButton from "./DeleteOrderButton";

export default function OrdersTable({ initialOrders }) {
  const [orders, setOrders] = useState(initialOrders);
  const [activeStatus, setActiveStatus] = useState("pending");

  const handleStatusChange = (orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const filteredOrders = orders.filter(
    (order) => order.status === activeStatus
  );

  return (
    <div className="max-w-7xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6 text-[color:var(--color-dark-olive)]">
        Lista porudžbina
      </h1>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveStatus("pending")}
          className={`px-4 py-2 rounded ${
            activeStatus === "pending"
              ? "bg-[color:var(--color-dark-olive)] text-white"
              : "bg-gray-200"
          }`}
        >
          Na čekanju
        </button>
        <button
          onClick={() => setActiveStatus("approved")}
          className={`px-4 py-2 rounded ${
            activeStatus === "approved"
              ? "bg-[color:var(--color-dark-olive)] text-white"
              : "bg-gray-200"
          }`}
        >
          Prihvaćene
        </button>
        <button
          onClick={() => setActiveStatus("denied")}
          className={`px-4 py-2 rounded ${
            activeStatus === "denied"
              ? "bg-[color:var(--color-dark-olive)] text-white"
              : "bg-gray-200"
          }`}
        >
          Odbijene
        </button>
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
                <th className="p-2 border">Država</th>
                <th className="p-2 border">Poštanski broj</th>
                <th className="p-2 border">Grad</th>
                <th className="p-2 border">Adresa</th>
                <th className="p-2 border">Ime i prezime</th>
                <th className="p-2 border">Telefon</th>
                <th className="p-2 border">Napomena</th>
                <th className="p-2 border">Datum</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Obriši</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="text-center">
                  <td className="p-2 border">{order.user?.name || "N/A"}</td>
                  <td className="p-2 border">{order.user?.email || "N/A"}</td>
                  <td className="p-2 border">{order.quantity}</td>
                  <td className="p-2 border">{order.country}</td>
                  <td className="p-2 border">{order.postalCode}</td>
                  <td className="p-2 border">{order.city}</td>
                  <td className="p-2 border">{order.address}</td>
                  <td className="p-2 border">{order.fullName}</td>
                  <td className="p-2 border">{order.phone}</td>
                  <td className="p-2 border">{order.note || <em>-</em>}</td>
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
                      onStatusChange={handleStatusChange}
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
