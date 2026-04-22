export default function Share() {
  return (
    <section className="px-4 py-18 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] border border-stone-200 bg-stone-950 text-stone-100 shadow-[0_40px_110px_-58px_rgba(0,0,0,0.65)]">
        <div className="grid gap-10 px-8 py-10 sm:px-10 lg:grid-cols-[1.15fr_0.85fr] lg:px-14 lg:py-14">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-emerald-300">
              Publish with intention
            </p>
            <h2 className="mt-5 max-w-2xl text-4xl font-semibold leading-tight text-white sm:text-5xl">
              Ready to share your perspective with readers who stay for the
              substance?
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-300">
              Join a publishing space designed for essays, quiet conviction, and
              writing that earns attention without begging for it.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              <button className="rounded-full bg-emerald-400 px-7 py-4 text-sm font-semibold text-stone-950 transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-300">
                Start Writing
              </button>
              <button className="rounded-full border border-white/20 bg-white/5 px-7 py-4 text-sm font-medium text-white transition duration-300 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/10">
                Explore Stories
              </button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.24em] text-stone-400">
                Start elegantly
              </p>
              <p className="mt-3 text-sm leading-7 text-stone-200">
                Free to begin, with room to refine your publication as it grows.
              </p>
            </div>
            <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.24em] text-stone-400">
                Build readership
              </p>
              <p className="mt-3 text-sm leading-7 text-stone-200">
                Reach readers through editorial discovery instead of algorithmic
                churn.
              </p>
            </div>
            <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.24em] text-stone-400">
                Keep your voice
              </p>
              <p className="mt-3 text-sm leading-7 text-stone-200">
                Shape your own rhythm, your own audience, and your own archive.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
