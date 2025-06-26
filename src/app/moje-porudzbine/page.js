import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function MojePorudzbinePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6 text-[#5F6F52]">
        Moje porudžbine
      </h1>
      {orders.length === 0 ? (
        <p>Nema porudžbina.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li key={order.id} className="border rounded p-4">
              <p>
                <strong>Količina:</strong> {order.quantity}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`inline-block px-2 py-1 rounded text-sm font-medium
                    ${
                      order.status === "approved"
                        ? "bg-green-200 text-green-800"
                        : order.status === "denied"
                        ? "bg-red-200 text-red-800"
                        : "bg-yellow-200 text-yellow-800"
                    }`}
                >
                  {order.status}
                </span>
              </p>
              <p className="text-sm text-gray-500">
                Poslato: {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
