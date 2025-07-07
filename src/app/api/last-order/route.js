import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const lastOrder = await prisma.order.findFirst({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  if (!lastOrder) {
    return new Response(JSON.stringify({ error: "No previous orders found" }), {
      status: 404,
    });
  }

  return new Response(JSON.stringify(lastOrder), { status: 200 });
}
