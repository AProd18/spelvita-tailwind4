"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateOrderStatus(orderId, newStatus) {
  try {
    await prisma.order.update({
      where: { id: orderId },
      data: { status: newStatus, isNotified: false },
    });

    revalidatePath("/admin/orders");

    return { success: true };
  } catch (error) {
    console.error("Greška pri ažuriranju statusa porudžbine:", error);
    return { success: false, message: error.message };
  }
}
