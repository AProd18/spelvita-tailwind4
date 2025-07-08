"use client";

export default function SuccessModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm text-center space-y-4">
        <h2 className="text-2xl font-bold text-green-700">
          Porudžbina poslata!
        </h2>
        <p className="text-gray-700">Hvala što ste poručili naš proizvod!</p>
        <p className="text-gray-700">
          Vaša porudžbina je uspešno poslata. Bićete uskoro preusmereni na
          stranicu za praćenje statusa.
        </p>
        <button
          onClick={onClose}
          className="mt-4 bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
        >
          Zatvori
        </button>
      </div>
    </div>
  );
}
