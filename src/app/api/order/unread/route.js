import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return new Response("Unauthorized", { status: 401 });

  const count = await prisma.order.count({
    where: {
      userId: session.user.id,
      isNotified: false,
    },
  });

  return Response.json({ unreadCount: count });
}
