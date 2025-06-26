import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";

export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return new Response(JSON.stringify({ error: "Morate biti prijavljeni." }), {
      status: 401,
    });
  }

  const body = await req.json();
  const {
    quantity,
    note,
    phone,
    address,
    country,
    postalCode,
    city,
    fullName,
  } = body;

  if (!quantity || quantity < 1) {
    return new Response(JSON.stringify({ error: "Nevažeća količina." }), {
      status: 400,
    });
  }

  if (!phone || phone.trim().length < 6) {
    return new Response(
      JSON.stringify({ error: "Unesite validan broj telefona." }),
      {
        status: 400,
      }
    );
  }
  if (!postalCode || postalCode.trim().length < 2) {
    return new Response(
      JSON.stringify({ error: "Unesite validan poštanski broj." }),
      {
        status: 400,
      }
    );
  }
  if (!city || city.trim().length < 2) {
    return new Response(JSON.stringify({ error: "Unesite validan grad." }), {
      status: 400,
    });
  }
  if (!fullName || fullName.trim().length < 3) {
    return new Response(JSON.stringify({ error: "Unesite ime i prezime." }), {
      status: 400,
    });
  }

  if (!address || address.trim().length < 5) {
    return new Response(JSON.stringify({ error: "Unesite validnu adresu." }), {
      status: 400,
    });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return new Response(
        JSON.stringify({ error: "Korisnik nije pronađen." }),
        {
          status: 404,
        }
      );
    }

    await prisma.order.create({
      data: {
        quantity,
        note,
        phone,
        address,
        country,
        postalCode,
        city,
        fullName,
        user: { connect: { id: user.id } },
        status: "pending",
      },
    });

    return new Response(
      JSON.stringify({ message: "Porudžbina uspešno poslata." }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Greška u /api/order:", error);
    return new Response(JSON.stringify({ error: "Greška na serveru." }), {
      status: 500,
    });
  }
}
