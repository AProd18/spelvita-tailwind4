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
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-sm text-center space-y-4">
        <h2 className="text-2xl font-semibold text-[color:var(--color-dark-olive)]">
          {title}
        </h2>
        <p className="text-gray-700">{message}</p>
        {!autoClose && (
          <button
            onClick={onClose}
            className="mt-4 bg-[color:var(--color-dark-olive)] text-[color:var(--color-cornsilk)] px-4 py-2 rounded hover:bg-[color:var(--color-laurel-green)] hover:text-[color:var(--color-cornsilk)] transition cursor-pointer"
          >
            Zatvori
          </button>
        )}
      </div>
    </div>
  );
}
