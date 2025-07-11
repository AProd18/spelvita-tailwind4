"use client";

import { useEffect } from "react";

export default function SuccessModal({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg text-center max-w-sm">
        <h2 className="text-xl font-bold text-green-600 mb-2">Uspešno!</h2>
        <p className="text-gray-700">{message}</p>
      </div>
    </div>
  );
}
