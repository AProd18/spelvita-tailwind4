import prisma from "@/lib/prisma";
import { hash } from "bcrypt";
import { sendVerificationEmail } from "@/lib/mailer";
import crypto from "crypto";

export async function POST(req) {
  try {
    const { email, username, password } = await req.json();

    if (!email || !username || !password) {
      return Response.json(
        { message: "Sva polja su obavezna." },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return Response.json(
        { message: "Korisnik sa tim emailom već postoji." },
        { status: 409 }
      );
    }

    const hashedPassword = await hash(password, 10);

    await prisma.user.create({
      data: {
        email,
        name: username,
        password: hashedPassword,
      },
    });

    // Generiši token
    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24h

    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token,
        expires,
      },
    });

    // Pošalji verifikacioni email
    await sendVerificationEmail(email, token);

    return Response.json(
      { message: "Verifikacioni email je poslat. Proverite vašu poštu." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Greška:", error);
    return Response.json({ message: "Greška na serveru." }, { status: 500 });
  }
}
