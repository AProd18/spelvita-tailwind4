"use server";

import prisma from "@/lib/prisma";

export async function deleteExperience(formData) {
  const id = formData.get("id");
  if (!id || typeof id !== "string") throw new Error("Nevažeći ID");

  await prisma.experience.delete({ where: { id } });
}
