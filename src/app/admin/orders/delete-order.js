"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteOrder(orderId) {
  await prisma.order.delete({
    where: { id: orderId },
  });

  revalidatePath("/admin/orders");
}
