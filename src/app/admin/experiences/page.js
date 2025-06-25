import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import ExperienceRow from "./ExperienceRow";

export default async function AdminExperiencesPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") return null;

  const experiences = await prisma.experience.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { name: true, email: true } },
    },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Iskustva korisnika</h1>
      {experiences.length === 0 ? (
        <p>Nema dodatih iskustava.</p>
      ) : (
        <div className="space-y-4">
          {experiences.map((exp) => (
            <ExperienceRow key={exp.id} experience={exp} />
          ))}
        </div>
      )}
    </div>
  );
}
