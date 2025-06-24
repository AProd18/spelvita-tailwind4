import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    redirect("/");
  }

  // fetch-ovanje podataka sa servera (prisma)
  const usersCount = await prisma.user.count();
  const ordersCount = await prisma.order.count();
  const availability = await prisma.availability.findFirst();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-6">Statistika</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white rounded shadow p-6">
          <h2 className="text-lg font-semibold mb-2">
            👤 Registrovani korisnici
          </h2>
          <p className="text-3xl font-bold">{usersCount}</p>
        </div>
        <div className="bg-white rounded shadow p-6">
          <h2 className="text-lg font-semibold mb-2">🧾 Broj porudžbina</h2>
          <p className="text-3xl font-bold">{ordersCount}</p>
        </div>
        <div className="bg-white rounded shadow p-6">
          <h2 className="text-lg font-semibold mb-2">🌾 Dostupno tabli žita</h2>
          <p className="text-3xl font-bold">{availability?.quantity || 0}</p>
        </div>
      </div>
    </div>
  );
}
