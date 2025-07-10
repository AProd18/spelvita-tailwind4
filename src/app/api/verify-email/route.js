import prisma from "@/lib/prisma";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  const record = await prisma.verificationToken.findUnique({
    where: { token },
  });

  if (!record || record.expires < new Date()) {
    return new Response("Token je nevažeći ili je istekao.", { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { email: record.identifier },
  });

  if (!user) {
    return new Response("Korisnik nije pronađen.", { status: 404 });
  }

  await prisma.user.update({
    where: { email: record.identifier },
    data: { emailVerified: new Date() },
  });

  await prisma.verificationToken.delete({ where: { token } });

  return new Response("Email uspešno verifikovan.", { status: 200 });
}
