import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";
import OrdersTable from "../components/OrdersTable";

export default async function AdminOrdersPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return redirect("/login");
  }

  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  await prisma.order.updateMany({
    where: { isViewed: false },
    data: { isViewed: true },
  });

  return <OrdersTable initialOrders={orders} />;
}
