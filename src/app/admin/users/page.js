import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";
import UsersTable from "./UsersTable";

export default async function AdminUsersPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return redirect("/login");
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

  return <UsersTable initialUsers={users} />;
}
