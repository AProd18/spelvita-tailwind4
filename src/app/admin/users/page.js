import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";

export default async function AdminUsersPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return redirect("/login"); // ili možeš redirect na neku drugu stranicu
  }

  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Lista korisnika</h1>

      {users.length === 0 ? (
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
