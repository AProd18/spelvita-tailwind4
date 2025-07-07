import prisma from "@/lib/prisma";

export async function fetchAvailability() {
  const latest = await prisma.availability.findFirst({
    orderBy: { updatedAt: "desc" },
  });
  return latest?.quantity ?? 0;
}
