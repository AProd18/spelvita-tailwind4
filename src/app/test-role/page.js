"use client";

import { useSession } from "next-auth/react";

export default function TestRoleCheckPage() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Učitavanje sesije...</p>;
  if (!session) return <p>Pristup odbijen: nisi ulogovan.</p>;

  const isAdmin = session.user?.role === "admin";

  if (!isAdmin) {
    return <p>Pristup odbijen: nisi administrator.</p>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <p>
        Dobrodošao, <strong>{session.user.email}</strong>. Imaš administratorska
        prava.
      </p>
    </div>
  );
}
