"use client";

import { useEffect } from "react";

export default function SuccessModal({
  title,
  message,
  autoClose = false,
  onClose,
  autoCloseDelay = 3000,
}) {
  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseDelay);
      return () => clearTimeout(timer);
    }
  }, [autoClose, autoCloseDelay, onClose]);

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm text-center space-y-4">
        <h2 className="text-2xl font-bold text-green-700">{title}</h2>
        <p className="text-gray-700">{message}</p>
        {!autoClose && (
          <button
            onClick={onClose}
            className="mt-4 bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
          >
            Zatvori
          </button>
        )}
      </div>
    </div>
  );
}
