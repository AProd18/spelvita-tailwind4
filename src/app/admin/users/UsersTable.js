"use client";

import { useState } from "react";
import DeleteUserButton from "../components/DeleteUserButton";

export default function UsersTable({ initialUsers }) {
  const [users, setUsers] = useState(initialUsers);

  const handleDelete = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Lista korisnika</h1>

      {users.length === 0 ? (
        <p>Nema korisnika za prikaz.</p>
      ) : (
        <div className="overflow-x-auto whitespace-nowrap">
          <table className="w-full table-auto border border-gray-300">
            <thead className="bg-[color:var(--color-dark-olive)] text-[color:var(--color-cornsilk)]">
              <tr>
                <th className="p-2 border">Korisničko ime</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Uloga</th>
                <th className="p-2 border">Datum registracije</th>
                <th className="p-2 border">Akcija</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="text-center">
                  <td className="p-2 border">
                    <strong>{user.name}</strong>
                  </td>
                  <td className="p-2 border">{user.email}</td>
                  <td className="p-2 border">{user.role}</td>
                  <td className="p-2 border">
                    {new Date(user.createdAt).toLocaleDateString("sr-RS", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </td>
                  <td className="p-2 border">
                    <DeleteUserButton
                      userId={user.id}
                      onDelete={handleDelete}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
