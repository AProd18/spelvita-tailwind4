import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({ message: "Niste prijavljeni." }, { status: 401 });
  }

  try {
    const { fullName, location, message } = await req.json();

    if (!fullName || !location || !message) {
      return Response.json(
        { message: "Sva polja su obavezna." },
        { status: 400 }
      );
    }

    await prisma.experience.create({
      data: {
        fullName,
        location,
        message,
        userId: session.user.id,
      },
    });

    return Response.json({ message: "Uspešno sačuvano." }, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Greška na serveru." }, { status: 500 });
  }
}
