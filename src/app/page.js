import Link from "next/link";

async function fetchExperiences() {
  const res = await fetch(
    `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/experience`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch experiences");
  }
  return res.json();
}

async function fetchAvailability() {
  const res = await fetch(
    `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/availability`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch availability");
  }
  const data = await res.json();
  return data.quantity || 0;
}

export default async function Home() {
  let experiences = [];
  let availability = 0;

  try {
    experiences = await fetchExperiences();
    availability = await fetchAvailability();
  } catch (error) {
    console.error(error);
  }

  return (
    <section className="text-center space-y-12">
      <div className="bg-gradient-to-b from-[color:var(--color-dark-olive)] to-[color:var(--color-light-olive)] text-[color:var(--color-cornsilk)] py-20 px-6 rounded-lg shadow-lg">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Oseti snagu prirode u svakoj kapljici
        </h2>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          Elixir od spelte je 100% prirodan napitak od zelenog žita — bez
          dodataka, bez kompromisa. Pravo iz srca prirode, za tvoje zdravlje i
          energiju.
        </p>
        <div className="mt-6 block text-center">
          <div className="bg-[color:var(--color-laurel-green)] text-[color:var(--color-cornsilk)] inline-block px-6 py-3 rounded-lg text-base shadow-md">
            Trenutno dostupno tabli žita:{" "}
            <span className="font-bold">{availability}</span>
          </div>
        </div>
        <Link href="/poruci">
          <button className="mt-8 bg-[color:var(--color-cornsilk)] text-[color:var(--color-dark-olive)] font-semibold py-3 px-6 rounded-full hover:bg-[color:var(--color-laurel-green)] hover:text-[color:var(--color-cornsilk)] transition-all duration-300 cursor-pointer">
            Poruči odmah
          </button>
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-8 text-left">
        <div className="bg-[color:var(--color-laurel-green)] text-[color:var(--color-cornsilk)] p-6 rounded-xl shadow">
          <h3 className="text-xl font-bold mb-2">100% Prirodno</h3>
          <p>
            Bez aditiva, bez konzervansa. Samo prirodne hranljive materije iz
            spelte.
          </p>
        </div>
        <div className="bg-[color:var(--color-laurel-green)] text-[color:var(--color-cornsilk)] p-6 rounded-xl shadow">
          <h3 className="text-xl font-bold mb-2">Detoks i Energija</h3>
          <p>
            Čisti organizam i daje ti prirodnu snagu za svakodnevne izazove.
          </p>
        </div>
        <div className="bg-[color:var(--color-laurel-green)] text-[color:var(--color-cornsilk)] p-6 rounded-xl shadow">
          <h3 className="text-xl font-bold mb-2">Domaća proizvodnja</h3>
          <p>
            Napravljen na porodičnom imanju sa ljubavlju i pažnjom prema svakom
            detalju.
          </p>
        </div>
      </div>

      <section
        className="py-16 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: "var(--color-cornsilk)" }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{ color: "var(--color-dark-olive)" }}
          >
            Kako se koristi Elixirspelte?
          </h2>
          <p
            className="text-lg mb-8"
            style={{ color: "var(--color-dark-olive)" }}
          >
            Neka ti jutro počne prirodno i snažno.
          </p>
          <div
            className="rounded-2xl shadow-md p-6 sm:p-8 border"
            style={{
              backgroundColor: "white",
              borderColor: "var(--color-laurel-green)",
              color: "var(--color-dark-olive)",
            }}
          >
            <ul className="space-y-4 text-left">
              <li className="flex items-start">
                <span className="mr-3 text-xl">🌿</span>
                <span>
                  <strong>Korak 1:</strong> Ujutru na prazan stomak, rastopi
                  jednu kocku zamrznute spelte u čaši hladne vode.
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-xl">💧</span>
                <span>
                  <strong>Korak 2:</strong> Nakon 15 minuta možeš doručkovati
                  kao i obično.
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-xl">⚡</span>
                <span>
                  <strong>Efekat:</strong> Podstiče detoksikaciju, daje energiju
                  i jača imunitet.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 rounded-lg bg-gradient-to-b from-[color:var(--color-laurel-green)] to-[color:var(--color-light-olive)]">
        <div className="max-w-5xl mx-auto text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Šta naš sok izdvaja od ostalih?
          </h2>
          <p className="text-lg mb-10">
            Nije svaki sok isti. Evo zašto je Elixirspelte jedinstven:
          </p>

          <div className="grid gap-8 sm:grid-cols-2">
            <div className="bg-[color:var(--color-dark-olive)] p-6 rounded-2xl shadow-md text-left">
              <h3 className="text-xl font-semibold mb-2">🥬 100% prirodan</h3>
              <p>
                Bez dodatih šećera, aditiva ili konzervansa. Samo čista priroda.
              </p>
            </div>
            <div className="bg-[color:var(--color-dark-olive)] p-6 rounded-2xl shadow-md text-left">
              <h3 className="text-xl font-semibold mb-2">❄️ Hladno ceđen</h3>
              <p>
                Sačuvani svi nutrijenti zahvaljujući procesu hladnog ceđenja.
              </p>
            </div>
            <div className="bg-[color:var(--color-dark-olive)] p-6 rounded-2xl shadow-md text-left">
              <h3 className="text-xl font-semibold mb-2">
                🌱 Lokalna proizvodnja
              </h3>
              <p>
                Proizveden u Srbiji – direktno sa naših polja do tvoje čaše.
              </p>
            </div>
            <div className="bg-[color:var(--color-dark-olive)] p-6 rounded-2xl shadow-md text-left">
              <h3 className="text-xl font-semibold mb-2">🥤 Neuporediv ukus</h3>
              <p>
                Blago gorak, osvežavajuć i bogat – ukus pravog zelenog života.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section
        className=" py-16 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: "var(--color-cornsilk)" }}
      >
        <div className="max-w-5xl mx-auto text-center">
          <h2
            className="text-3xl sm:text-4xl font-bold  mb-10"
            style={{ color: "var(--color-dark-olive)" }}
          >
            Iskustva korisnika
          </h2>

          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2">
            {experiences.length === 0 && (
              <p className="text-[#5F6F52]">Još nema iskustava.</p>
            )}

            {experiences.map((exp) => (
              <div
                key={exp.id}
                className="bg-white border border-[#A9B388] rounded-2xl p-6 shadow-md text-left"
              >
                <p className="text-[#5F6F52] italic mb-4">“{exp.message}”</p>
                <div className="font-semibold text-[#5F6F52]">
                  {exp.fullName}, {exp.location}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-gradient-to-b from-[color:var(--color-dark-olive)] to-[color:var(--color-light-olive)] py-16 px-4 sm:px-6 lg:px-8 rounded-lg">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Započni svoju Elixirspelte rutinu danas
          </h2>
          <p className="text-white text-lg mb-8">
            Prirodan izvor energije i vitalnosti — tvoj organizam će ti biti
            zahvalan.
          </p>
          <a
            href="#poruci"
            className="inline-block bg-[color:var(--color-cornsilk)] text-[color:var(--color-dark-olive)] font-semibold py-3 px-6 rounded-full hover:bg-[color:var(--color-laurel-green)] hover:text-[color:var(--color-cornsilk)] transition"
          >
            Poruči svoju dozu zdravlja
          </a>
        </div>
      </section>
    </section>
  );
}
