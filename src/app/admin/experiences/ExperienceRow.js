"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteExperience } from "@/app/admin/experiences/deleteExperience";

export default function ExperienceRow({ experience }) {
  const [confirming, setConfirming] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    const formData = new FormData();
    formData.append("id", experience.id);
    await deleteExperience(formData);
    router.refresh();
  };

  return (
    <div className="border p-4 rounded shadow bg-white mb-4">
      <p className="font-semibold">{experience.fullName}</p>
      <p className="text-sm text-gray-600">{experience.location}</p>
      <p className="mt-2">{experience.message}</p>

      <div className="mt-4">
        {!confirming ? (
          <button
            onClick={() => setConfirming(true)}
            className="text-red-600 font-semibold hover:underline cursor-pointer"
          >
            Obriši
          </button>
        ) : (
          <div className="space-x-2">
            <span className="text-sm">Obrisati iskustvo?</span>
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 cursor-pointer"
            >
              Da
            </button>
            <button
              onClick={() => setConfirming(false)}
              className="text-gray-600 hover:underline cursor-pointer"
            >
              Ne
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
