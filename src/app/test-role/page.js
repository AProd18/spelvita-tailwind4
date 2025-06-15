"use client";

import { useSession } from "next-auth/react";

export default function TestRolePage() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Učitavanje sesije...</p>;
  if (!session) return <p>Nisi ulogovan.</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Test Role Page</h1>
      <p>
        <strong>Email:</strong> {session.user?.email}
      </p>
      <p>
        <strong>Role:</strong> {session.user?.role}
      </p>
    </div>
  );
}
