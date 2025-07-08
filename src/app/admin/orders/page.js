import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";
import OrderStatusTabs from "../components/OrderStatusTabs";

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

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6 text-[color:var(--color-dark-olive)]">
        Lista porudžbina
      </h1>
      {orders.length === 0 ? (
        <p>Nema porudžbina.</p>
      ) : (
        <OrderStatusTabs orders={orders} />
      )}
    </div>
  );
}
