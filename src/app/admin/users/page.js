"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function AdminUsersPage() {
  const { data: session, status } = useSession();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (session?.user?.role === "admin") {
      fetch("/api/admin/users")
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setUsers(data);
          }
        })
        .catch(() => setError("Greška prilikom učitavanja korisnika."))
        .finally(() => setLoading(false));
    }
  }, [session]);

  if (status === "loading") return <p>Učitavanje...</p>;
  if (!session || session.user.role !== "admin")
    return <p>Pristup dozvoljen samo adminima.</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Lista korisnika</h1>

      {loading ? (
        <p>Učitavanje korisnika...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : users.length === 0 ? (
        <p>Nema korisnika za prikaz.</p>
      ) : (
        <table className="w-full table-auto border border-gray-300">
          <thead className="bg-[color:var(--color-dark-olive)] text-[color:var(--color-cornsilk)]">
            <tr>
              {/* <th className="p-2 border">ID</th> */}
              <th className="p-2 border">Korisničko ime</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Uloga</th>
              <th className="p-2 border">Datum registracije</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="text-center">
                {/* <td className="p-2 border">{user.id}</td> */}
                <td className="p-2 border">{user.name}</td>
                <td className="p-2 border">{user.email}</td>
                <td className="p-2 border">{user.role}</td>
                <td className="p-2 border">
                  {new Date(user.createdAt).toLocaleDateString("sr-RS", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
