import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";
import AvailabilityForm from "./AvailabilityForm";
import { redirect } from "next/navigation";

export default async function AdminAvailabilityPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    redirect("/");
  }

  const availability = await prisma.availability.findFirst();

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Ažuriraj broj tabli žita</h1>
      <AvailabilityForm initialQuantity={availability?.quantity || 0} />
    </div>
  );
}
