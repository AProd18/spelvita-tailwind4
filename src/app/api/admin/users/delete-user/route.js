import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";

export async function DELETE(req) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 403,
    });
  }

  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("id");

  if (!userId) {
    return new Response(JSON.stringify({ error: "User ID is required" }), {
      status: 400,
    });
  }

  try {
    await prisma.user.delete({
      where: { id: userId },
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Greška pri brisanju korisnika." }),
      {
        status: 500,
      }
    );
  }
}
