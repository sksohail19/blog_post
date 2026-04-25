import Link from "next/link";
import categories from "../../../sample-data/categories.json";

type Category = {
  _id: string;
  title: string;
  slug: string;
  postsCount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  lastPostAddedAt: string | null;
};

const blogCategories = categories as Category[];

function formatDate(value: string | null) {
  if (!value) {
    return "No posts yet";
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export default function CategoriesPage() {
  const activeCategories = blogCategories.filter((category) => category.isActive);
  const inactiveCategoriesCount = blogCategories.length - activeCategories.length;
  const latestCategory = [...activeCategories].sort(
    (first, second) =>
      new Date(second.lastPostAddedAt ?? 0).getTime() -
      new Date(first.lastPostAddedAt ?? 0).getTime(),
  )[0];

  return (
    <main className="flex-1 bg-stone-50 px-4 py-10 text-stone-950 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-7xl">
        <div className="mb-10 grid gap-8 border-b border-stone-200 pb-8 lg:grid-cols-[1fr_360px] lg:items-end">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-stone-500">
              Collections
            </p>
            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-stone-950 sm:text-5xl">
              Browse the editorial library by topic.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-stone-600">
              Each collection groups related guides so readers can move from a
              broad idea to the exact article they need.
            </p>
          </div>

          <div className="grid grid-cols-3 border border-stone-200 bg-white text-center">
            <div className="border-r border-stone-200 px-4 py-4">
              <span className="block text-2xl font-semibold">{blogCategories.length}</span>
              <span className="text-xs font-medium uppercase tracking-[0.16em] text-stone-500">
                Total
              </span>
            </div>
            <div className="border-r border-stone-200 px-4 py-4">
              <span className="block text-2xl font-semibold">{activeCategories.length}</span>
              <span className="text-xs font-medium uppercase tracking-[0.16em] text-stone-500">
                Active
              </span>
            </div>
            <div className="px-4 py-4">
              <span className="block text-2xl font-semibold">{inactiveCategoriesCount}</span>
              <span className="text-xs font-medium uppercase tracking-[0.16em] text-stone-500">
                Paused
              </span>
            </div>
          </div>
        </div>

        {latestCategory ? (
          <Link
            href={`/categories/${latestCategory.slug}`}
            className="group mb-10 grid gap-6 border border-stone-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_80px_-48px_rgba(41,37,36,0.45)] md:grid-cols-[1fr_auto] md:items-center sm:p-8"
          >
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
                Recently updated
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-stone-950">
                {latestCategory.title}
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-600">
                Last post added {formatDate(latestCategory.lastPostAddedAt)}.
                Explore the newest material in this collection.
              </p>
            </div>

            <div className="flex items-center gap-8 text-sm text-stone-600">
              <span>
                <strong className="block text-3xl font-semibold text-stone-950">
                  {latestCategory.postsCount}
                </strong>
                posts
              </span>
              <span className="font-semibold text-stone-950 transition group-hover:translate-x-1">
                View collection
              </span>
            </div>
          </Link>
        ) : null}

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {activeCategories.map((category) => (
            <article
              key={category._id}
              className="flex min-h-full flex-col border border-stone-200 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_-52px_rgba(41,37,36,0.5)]"
            >
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
                    Active collection
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold tracking-tight text-stone-950">
                    <Link href={`/categories/${category.slug}`} className="hover:text-stone-600">
                      {category.title}
                    </Link>
                  </h2>
                </div>
                <span className="border border-stone-200 bg-stone-50 px-3 py-1 text-sm font-semibold text-stone-700">
                  {category.postsCount}
                </span>
              </div>

              <dl className="grid gap-3 text-sm text-stone-600">
                <div className="flex justify-between gap-4 border-t border-stone-200 pt-3">
                  <dt>Last post</dt>
                  <dd className="font-medium text-stone-950">
                    {formatDate(category.lastPostAddedAt)}
                  </dd>
                </div>
                <div className="flex justify-between gap-4 border-t border-stone-200 pt-3">
                  <dt>Updated</dt>
                  <dd className="font-medium text-stone-950">
                    {formatDate(category.updatedAt)}
                  </dd>
                </div>
              </dl>

              <Link
                href={`/categories/${category.slug}`}
                className="mt-6 inline-flex border-t border-stone-200 pt-5 text-sm font-semibold text-stone-950 transition hover:text-stone-600"
              >
                Open category
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
