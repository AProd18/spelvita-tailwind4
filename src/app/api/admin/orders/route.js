import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json(
      { error: "Neautorizovan pristup." },
      { status: 401 }
    );
  }

  try {
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

    return NextResponse.json(orders);
  } catch (error) {
    console.error("Greška u GET /api/admin/orders:", error);
    return NextResponse.json({ error: "Greška na serveru." }, { status: 500 });
  }
}
