import Image from "next/image";

type Feature = {
  title: string;
  description: string;
  icon?: string;
  accent: string;
  layout: string;
  tag: string;
  metric?: string;
  preview?: "editor" | "type" | "community" | "analytics";
};

const features: Feature[] = [
  {
    title: "Focus-Driven Editor",
    description:
      "Write inside a calm, spacious editor where formatting stays subtle and your words remain the main event.",
    icon: "https://img.icons8.com/comic/100/ball-point-pen.png",
    accent: "from-amber-100 via-orange-50 to-white",
    layout: "lg:col-span-3 lg:row-span-2",
    tag: "Writing Flow",
    metric: "Distraction-free canvas",
    preview: "editor",
  },
  {
    title: "Premium Typography",
    description:
      "Every article is presented with thoughtful rhythm, generous line spacing, and print-inspired clarity for long reads.",
    icon: "https://img.icons8.com/hands/100/sparkling.png",
    accent: "from-emerald-100 via-lime-50 to-white",
    layout: "lg:col-span-2 lg:row-span-2",
    tag: "Reading Experience",
    metric: "Built for immersion",
    preview: "type",
  },
  {
    title: "Human Curation",
    description:
      "Readers discover voices through editorial taste and genuine interests, not a black-box feed chasing attention.",
    icon: "https://img.icons8.com/ios/50/find-user-male.png",
    accent: "from-sky-100 via-cyan-50 to-white",
    layout: "lg:col-span-2 lg:row-span-1",
    tag: "Discovery",
    metric: "No manipulative ranking",
    preview: "community",
  },
  {
    title: "Editorial Insights",
    description:
      "Go beyond page views with signals that reveal depth, resonance, and how readers spend time with your ideas.",
    accent: "from-stone-200 via-stone-50 to-white",
    layout: "lg:col-span-3 lg:row-span-1",
    tag: "Analytics",
    metric: "Meaningful engagement data",
    preview: "analytics",
  },
];

function FeaturePreview({ preview }: { preview?: Feature["preview"] }) {
  if (preview === "editor") {
    return (
      <div className="mt-6 rounded-[1.5rem] border border-stone-200 bg-stone-950 p-5 text-stone-100 shadow-[0_24px_80px_-32px_rgba(0,0,0,0.7)]">
        <div className="mb-4 flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
        </div>
        <div className="space-y-3">
          <div className="h-3 w-2/5 rounded-full bg-stone-700" />
          <div className="h-3 w-full rounded-full bg-stone-800" />
          <div className="h-3 w-11/12 rounded-full bg-stone-800" />
          <div className="h-3 w-4/5 rounded-full bg-stone-800" />
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.24em] text-stone-400">
              Focus mode
            </p>
            <p className="mt-2 text-sm text-stone-200">
              Minimal controls surface only when needed.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.24em] text-stone-400">
              Draft flow
            </p>
            <p className="mt-2 text-sm text-stone-200">
              Compose, revise, and publish without visual noise.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (preview === "type") {
    return (
      <div className="mt-6 rounded-[1.5rem] border border-emerald-100 bg-white p-6 shadow-[0_24px_70px_-38px_rgba(16,185,129,0.45)]">
        <p className="text-xs uppercase tracking-[0.28em] text-emerald-700">
          Editorial sample
        </p>
        <h3 className="mt-3 text-3xl font-semibold italic text-stone-900">
          Beautiful reading should feel invisible.
        </h3>
        <p className="mt-4 max-w-sm text-sm leading-7 text-stone-600">
          Refined type scale, measured line length, and breathable spacing keep
          long-form stories elegant from first sentence to final note.
        </p>
      </div>
    );
  }

  if (preview === "community") {
    return (
      <div className="mt-6 flex items-center gap-3 rounded-[1.5rem] border border-sky-100 bg-white/90 p-5 shadow-[0_24px_70px_-42px_rgba(14,165,233,0.45)]">
        <div className="flex -space-x-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-sky-100 text-sm font-semibold text-sky-700">
            AL
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-emerald-100 text-sm font-semibold text-emerald-700">
            MK
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-amber-100 text-sm font-semibold text-amber-700">
            JR
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-stone-900">
            Curated circles, not infinite feeds
          </p>
          <p className="text-sm text-stone-600">
            Follow editors, themes, and readers with taste similar to yours.
          </p>
        </div>
      </div>
    );
  }

  if (preview === "analytics") {
    return (
      <div className="mt-6 grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[1.5rem] border border-stone-200 bg-white p-5 shadow-[0_24px_70px_-42px_rgba(41,37,36,0.35)]">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-stone-500">
                Reader resonance
              </p>
              <p className="mt-2 text-3xl font-semibold text-stone-900">82%</p>
            </div>
            <p className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
              +14% this month
            </p>
          </div>
          <div className="mt-5 flex h-28 items-end gap-3">
            <div className="h-12 w-full rounded-t-2xl bg-stone-200" />
            <div className="h-20 w-full rounded-t-2xl bg-stone-300" />
            <div className="h-16 w-full rounded-t-2xl bg-stone-300" />
            <div className="h-24 w-full rounded-t-2xl bg-stone-400" />
            <div className="h-18 w-full rounded-t-2xl bg-emerald-400" />
          </div>
        </div>
        <div className="rounded-[1.5rem] border border-stone-200 bg-stone-950 p-5 text-stone-100 shadow-[0_24px_70px_-42px_rgba(0,0,0,0.55)]">
          <p className="text-xs uppercase tracking-[0.24em] text-stone-400">
            Attention quality
          </p>
          <p className="mt-3 text-sm leading-7 text-stone-300">
            See where readers linger, where they highlight, and which essays
            inspire return visits.
          </p>
        </div>
      </div>
    );
  }

  return null;
}

function FeatureCard({
  title,
  description,
  icon,
  accent,
  tag,
  metric,
  preview,
}: Feature) {
  return (
    <article
      className={`group relative h-full overflow-hidden rounded-[2rem] border border-stone-200/80 bg-gradient-to-br ${accent} p-6 md:p-8 shadow-[0_28px_80px_-48px_rgba(41,37,36,0.45)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_34px_90px_-42px_rgba(41,37,36,0.55)]`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.8),transparent_32%)] opacity-70" />
      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-stone-500">
              {tag}
            </p>
            <h2 className="mt-3 max-w-sm text-2xl font-semibold text-stone-950 md:text-3xl">
              {title}
            </h2>
          </div>
          {icon ? (
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/70 bg-white/80 shadow-sm backdrop-blur">
              <Image src={icon} alt={`${title} icon`} width={36} height={36} />
            </div>
          ) : (
            <div className="rounded-full border border-stone-300 bg-white/80 px-3 py-1 text-xs font-medium text-stone-600">
              Insight Layer
            </div>
          )}
        </div>

        <p className="mt-5 max-w-xl text-base leading-7 text-stone-700">
          {description}
        </p>

        {metric ? (
          <div className="mt-6 inline-flex w-fit rounded-full border border-stone-300/70 bg-white/70 px-4 py-2 text-sm font-medium text-stone-700 backdrop-blur">
            {metric}
          </div>
        ) : null}

        <div className="mt-auto">
          <FeaturePreview preview={preview} />
        </div>
      </div>
    </article>
  );
}

export default function Features() {
  return (
    <section className="relative isolate overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="absolute inset-x-0 top-0 -z-10 h-64 bg-[radial-gradient(circle_at_top,rgba(196,181,253,0.16),transparent_55%)]" />
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-emerald-700">
            Crafted for modern essays
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-stone-950 sm:text-5xl">
            Designed for the digital curator, not the content treadmill.
          </h1>
          <p className="mt-6 text-lg leading-8 text-stone-600">
            Every surface is shaped to help writers publish with care and help
            readers stay present with the work in front of them.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:auto-rows-[minmax(260px,auto)] lg:grid-cols-5">
          {features.map((feature) => (
            <div key={feature.title} className={feature.layout}>
              <FeatureCard {...feature} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
