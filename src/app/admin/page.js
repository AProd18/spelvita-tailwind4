import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    redirect("/");
  }

  const usersCount = await prisma.user.count();
  const ordersCount = await prisma.order.count();
  const availability = await prisma.availability.findFirst();
  const experiencesCount = await prisma.experience.count();

  return (
    <div className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
        <div className="bg-white rounded shadow p-6">
          <h2 className="text-lg font-semibold mb-2">🗣️ Broj iskustava</h2>
          <p className="text-3xl font-bold">{experiencesCount}</p>
        </div>
      </div>
    </div>
  );
}
