import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("Pozvana ruta /api/admin/orders/count");

    const count = await prisma.order.count();
    console.log("Broj porudžbina:", count);

    return NextResponse.json({ count });
  } catch (error) {
    console.error("Error fetching order count:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
