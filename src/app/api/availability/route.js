import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  try {
    const latest = await prisma.availability.findFirst({
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json({ quantity: latest?.quantity ?? 0 });
  } catch (error) {
    console.error("GET availability error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(request) {
  const session = await getServerSession(authOptions); // ✅ ispravljeno

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const body = await request.json();
  const { quantity } = body;

  if (typeof quantity !== "number" || quantity < 0) {
    return NextResponse.json({ error: "Invalid quantity" }, { status: 400 });
  }

  try {
    const existing = await prisma.availability.findFirst();

    let updated;
    if (existing) {
      updated = await prisma.availability.update({
        where: { id: existing.id },
        data: { quantity },
      });
    } else {
      updated = await prisma.availability.create({
        data: { quantity },
      });
    }

    return NextResponse.json({ success: true, updated });
  } catch (error) {
    console.error("PUT availability error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
