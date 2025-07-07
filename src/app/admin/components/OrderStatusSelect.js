"use client";

import { useTransition } from "react";
import { updateOrderStatus } from "../orders/update-order-status";

export default function OrderStatusSelect({
  orderId,
  currentStatus,
  onStatusChange,
}) {
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    const newStatus = e.target.value;
    startTransition(() => {
      updateOrderStatus(orderId, newStatus).then((res) => {
        if (res.success) {
          onStatusChange(orderId, newStatus);
        } else {
          alert("Greška pri ažuriranju statusa: " + res.message);
        }
      });
    });
  };

  return (
    <select
      name="status"
      defaultValue={currentStatus}
      onChange={handleChange}
      disabled={isPending}
      className="border rounded p-1 text-sm"
    >
      <option value="pending">⏳ Na čekanju</option>
      <option value="approved">✅ Prihvaćeno</option>
      <option value="denied">❌ Odbijeno</option>
    </select>
  );
}
