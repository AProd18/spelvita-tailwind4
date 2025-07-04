import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";
import OrderStatusSelect from "../components/OrderStatusSelect";
import DeleteOrderButton from "../components/DeleteOrderButton";

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
        <div className="overflow-x-auto whitespace-nowrap">
          <table className="w-full table-auto border border-gray-300 text-sm min-w-[900px]">
            <thead className="bg-[color:var(--color-dark-olive)] text-[color:var(--color-cornsilk)]">
              <tr>
                <th className="p-2 border">Korisnik</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Broj tabli</th>
                <th className="p-2 border">Drzava</th>
                <th className="p-2 border">Postanski broj</th>
                <th className="p-2 border">Grad</th>
                <th className="p-2 border">Adresa</th>
                <th className="p-2 border">Ime i prezime</th>
                <th className="p-2 border">Kontakt telefon</th>
                <th className="p-2 border">Napomena</th>
                <th className="p-2 border">Datum</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Obriši</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="text-center">
                  <td className="p-2 border">{order.user?.name || "N/A"}</td>
                  <td className="p-2 border">{order.user?.email || "N/A"}</td>
                  <td className="p-2 border">{order.quantity}</td>
                  <td className="p-2 border">{order.country}</td>
                  <td className="p-2 border">{order.postalCode}</td>
                  <td className="p-2 border">{order.city}</td>
                  <td className="p-2 border">{order.address}</td>
                  <td className="p-2 border">{order.fullName}</td>
                  <td className="p-2 border">{order.phone}</td>
                  <td className="p-2 border">
                    {order.note ? order.note : <em>-</em>}
                  </td>
                  <td className="p-2 border">
                    {new Date(order.createdAt).toLocaleString("sr-RS", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </td>
                  <td className="p-2 border">
                    <OrderStatusSelect
                      orderId={order.id}
                      currentStatus={order.status}
                    />
                  </td>
                  <td className="p-2 border">
                    <DeleteOrderButton orderId={order.id} />
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
