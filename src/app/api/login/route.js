import { compare } from "bcrypt";
import prisma from "@/lib/prisma";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !user.password) {
      return Response.json(
        { message: "Email nije pronađen." },
        { status: 401 }
      );
    }

    const isValid = await compare(password, user.password);

    if (!isValid) {
      return Response.json({ message: "Neispravna lozinka." }, { status: 401 });
    }

    // TODO: Ovde bi trebalo dodati autentifikaciju kroz session (ili NextAuth)
    return Response.json({ message: "Uspešno ste prijavljeni!" });
  } catch (err) {
    console.error(err);
    return Response.json({ message: "Greška na serveru." }, { status: 500 });
  }
}
