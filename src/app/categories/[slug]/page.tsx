import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import categories from "../../../../sample-data/categories.json";
import posts from "../../../../sample-data/posts.json";

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

type BlogPost = {
  _id: string;
  title: string;
  slug: string;
  content: string;
  coverImage: string;
  status: "draft" | "published" | "archived";
  category: string;
  tags: string[];
  stats: {
    views: number;
    likesCount: number;
    commentsCount: number;
    bookMarksCount: number;
  };
  publishedAt: string | null;
};

const blogCategories = categories as Category[];
const blogPosts = posts as BlogPost[];

function formatDate(value: string | null) {
  if (!value) {
    return "No posts yet";
  }

  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export function generateStaticParams() {
  return blogCategories.map((category) => ({
    slug: category.slug,
  }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = blogCategories.find((item) => item.slug === slug);

  if (!category) {
    notFound();
  }

  const categoryPosts = blogPosts.filter((post) => post.category === category._id);
  const publishedPosts = categoryPosts.filter((post) => post.status === "published");
  const totalViews = categoryPosts.reduce((sum, post) => sum + post.stats.views, 0);

  return (
    <main className="flex-1 bg-stone-50 px-4 py-10 text-stone-950 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-7xl">
        <Link
          href="/categories"
          className="mb-8 inline-flex text-sm font-semibold text-stone-600 transition hover:text-stone-950"
        >
          Back to categories
        </Link>

        <header className="mb-10 grid gap-8 border-b border-stone-200 pb-8 lg:grid-cols-[1fr_360px] lg:items-end">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-stone-500">
              Category
            </p>
            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-stone-950 sm:text-5xl">
              {category.title}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-stone-600">
              A focused collection of articles for this topic. Last updated on{" "}
              {formatDate(category.updatedAt)}.
            </p>
          </div>

          <div className="border border-stone-200 bg-white p-5">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-stone-950">
              Collection stats
            </h2>
            <dl className="grid gap-3 text-sm text-stone-600">
              <div className="flex justify-between gap-4">
                <dt>Status</dt>
                <dd className="font-semibold text-stone-950">
                  {category.isActive ? "Active" : "Paused"}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>Posts</dt>
                <dd className="font-semibold text-stone-950">{categoryPosts.length}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>Published</dt>
                <dd className="font-semibold text-stone-950">{publishedPosts.length}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>Total views</dt>
                <dd className="font-semibold text-stone-950">
                  {totalViews.toLocaleString()}
                </dd>
              </div>
            </dl>
          </div>
        </header>

        {categoryPosts.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {categoryPosts.map((post) => (
              <article
                key={post._id}
                className="flex min-h-full flex-col overflow-hidden border border-stone-200 bg-white"
              >
                <Link href={`/posts/${post.slug}`} className="group block">
                  <div className="relative aspect-[16/9] overflow-hidden bg-stone-200">
                    <Image
                      src={post.coverImage}
                      alt=""
                      fill
                      sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                </Link>

                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-4 flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
                    <span>{post.status}</span>
                    <span>{formatDate(post.publishedAt)}</span>
                  </div>

                  <h2 className="text-xl font-semibold tracking-tight text-stone-950">
                    <Link href={`/posts/${post.slug}`} className="transition hover:text-stone-600">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-stone-600">
                    {post.content}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="border border-stone-200 px-2.5 py-1 text-xs font-medium text-stone-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex items-center justify-between border-t border-stone-200 pt-5 text-sm text-stone-500">
                    <span>{post.stats.views.toLocaleString()} views</span>
                    <Link
                      href={`/posts/${post.slug}`}
                      className="font-semibold text-stone-950 transition hover:text-stone-600"
                    >
                      Read post
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="border border-stone-200 bg-white p-8 text-stone-600">
            No posts are assigned to this category yet.
          </div>
        )}
      </section>
    </main>
  );
}
