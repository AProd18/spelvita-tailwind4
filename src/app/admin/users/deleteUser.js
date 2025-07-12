"use client";

export async function deleteUser(userId) {
  const res = await fetch(`/api/admin/users/delete-user?id=${userId}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Greška prilikom brisanja korisnika.");
  }

  return res.json();
}
