import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden px-4 pb-12 pt-8 sm:px-6 lg:px-8 lg:pb-20 lg:pt-12">
      <div className="absolute left-1/2 top-0 -z-10 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(187,247,208,0.45),rgba(255,255,255,0))]" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <article className="max-w-3xl">
          <div className="inline-flex items-center gap-3 rounded-full border border-emerald-200 bg-emerald-50/80 px-4 py-2 text-xs font-medium uppercase tracking-[0.28em] text-emerald-800">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Volume 01: The Art of Expression
          </div>

          <h1 className="mt-8 max-w-4xl text-5xl font-semibold leading-[0.95] tracking-tight text-stone-950 sm:text-6xl lg:text-7xl xl:text-[5.6rem]">
            A publishing home
            <span className="block italic text-stone-700">
              for thoughtful voices.
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-stone-600 sm:text-xl">
            Built for essays, dispatches, and ideas worth lingering on. Publish
            with clarity, shape an intentional audience, and let every story
            arrive with editorial presence.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <button className="rounded-full bg-stone-950 px-7 py-4 text-sm font-medium text-white transition duration-300 hover:-translate-y-0.5 hover:bg-stone-800">
              Start Writing
            </button>
            <button className="rounded-full border border-stone-300 bg-white/80 px-7 py-4 text-sm font-medium text-stone-800 backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:border-stone-500">
              Explore Stories
            </button>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            <div className="rounded-[1.5rem] border border-stone-200 bg-white/80 p-5 shadow-[0_24px_70px_-42px_rgba(41,37,36,0.35)] backdrop-blur">
              <p className="text-xs uppercase tracking-[0.24em] text-stone-500">
                Essays published
              </p>
              <p className="mt-3 text-3xl font-semibold text-stone-950">12k+</p>
            </div>
            <div className="rounded-[1.5rem] border border-stone-200 bg-white/80 p-5 shadow-[0_24px_70px_-42px_rgba(41,37,36,0.35)] backdrop-blur">
              <p className="text-xs uppercase tracking-[0.24em] text-stone-500">
                Average read time
              </p>
              <p className="mt-3 text-3xl font-semibold text-stone-950">8 min</p>
            </div>
            <div className="rounded-[1.5rem] border border-stone-200 bg-white/80 p-5 shadow-[0_24px_70px_-42px_rgba(41,37,36,0.35)] backdrop-blur">
              <p className="text-xs uppercase tracking-[0.24em] text-stone-500">
                Curated circles
              </p>
              <p className="mt-3 text-3xl font-semibold text-stone-950">420</p>
            </div>
          </div>
        </article>

        <aside className="relative">
          <div className="absolute inset-x-8 top-6 -z-10 h-full rounded-[2.25rem] bg-gradient-to-br from-emerald-100 via-lime-50 to-transparent blur-2xl" />
          <div className="relative overflow-hidden rounded-[2.25rem] border border-stone-200 bg-[linear-gradient(145deg,#ffffff,#f7f5f2)] p-4 shadow-[0_40px_120px_-56px_rgba(41,37,36,0.45)] sm:p-6">
            <div className="rounded-[1.75rem] border border-stone-200 bg-stone-950 p-4 text-stone-100 sm:p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
                </div>
                <p className="text-xs uppercase tracking-[0.24em] text-stone-400">
                  Editor Preview
                </p>
              </div>

              <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/5 p-4 sm:p-5">
                <p className="text-xs uppercase tracking-[0.24em] text-emerald-300">
                  Draft in progress
                </p>
                <h2 className="mt-3 text-2xl font-semibold text-white">
                  On writing with attention in a hurried internet
                </h2>
                <p className="mt-4 text-sm leading-7 text-stone-300">
                  A good platform should disappear beneath the work and still
                  quietly shape the reading experience with grace.
                </p>
              </div>

              <div className="mt-6 overflow-hidden rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]">
                <Image
                  src="/assets/writting.png"
                  alt="Illustration of a writer working in a calm editorial environment"
                  width={720}
                  height={520}
                  className="h-auto w-full object-cover"
                  priority
                />
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-stone-400">
                    Reading mood
                  </p>
                  <p className="mt-2 text-sm text-stone-200">
                    Calm layouts with generous spacing and softer contrast.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-stone-400">
                    Editorial tools
                  </p>
                  <p className="mt-2 text-sm text-stone-200">
                    Light-touch controls that support structure without noise.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
