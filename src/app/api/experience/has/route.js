import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function GET(req) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({ hasExperience: false }, { status: 401 });
  }

  try {
    const experience = await prisma.experience.findFirst({
      where: { userId: session.user.id },
    });

    return Response.json(
      { hasExperience: Boolean(experience) },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return Response.json({ hasExperience: false }, { status: 500 });
  }
}
