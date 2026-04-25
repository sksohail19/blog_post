export default function Quotation() {
  return (
    <section className="px-4 py-18 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-5xl rounded-[2.5rem] border border-stone-200 bg-[linear-gradient(135deg,#fafaf9,#f5f5f4)] p-8 shadow-[0_34px_100px_-58px_rgba(41,37,36,0.45)] sm:p-10 lg:p-14">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-stone-500">
            Writer Reflection
          </p>
          <blockquote className="mt-6 text-3xl font-semibold italic leading-[1.35] text-stone-900 sm:text-4xl lg:text-[2.8rem]">
            &ldquo;The platform feels like a beautifully bound book that
            breathes. It&apos;s where I go when I have something real to
            say.&rdquo;
          </blockquote>
          <div className="mt-8 inline-flex items-center gap-4 rounded-full border border-stone-200 bg-white px-5 py-3 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-emerald-800">
              ER
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-800">
                Elena Rossi
              </p>
              <p className="text-sm text-stone-500">Columnist and essayist</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
