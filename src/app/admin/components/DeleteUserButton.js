"use client";

import { useState, useTransition } from "react";
import { deleteUser } from "../users/deleteUser";

export default function DeleteUserButton({ userId, onDelete }) {
  const [showModal, setShowModal] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await deleteUser(userId);
        setShowModal(false);
        onDelete(userId);
      } catch (error) {
        alert(error.message);
      }
    });
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="bg-red-600 text-white px-2 py-1 rounded text-sm hover:bg-red-700 transition cursor-pointer"
      >
        Obriši
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow max-w-sm w-full text-center">
            <h2 className="text-lg font-semibold mb-4">Potvrda brisanja</h2>
            <p className="mb-4">
              Da li ste sigurni da želite da obrišete ovog korisnika?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDelete}
                disabled={isPending}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition cursor-pointer"
              >
                Da, obriši
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition cursor-pointer"
              >
                Otkaži
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
