import Link from "next/link";
import Image from "next/image";
import posts from "../../../sample-data/posts.json";

type BlogPost = {
  _id: string;
  title: string;
  slug: string;
  content: string;
  coverImage: string;
  status: "draft" | "published" | "archived";
  tags: string[];
  stats: {
    views: number;
    likesCount: number;
    commentsCount: number;
    bookMarksCount: number;
  };
  publishedAt: string | null;
};

const blogPosts = posts as BlogPost[];

function formatDate(value: string | null) {
  if (!value) {
    return "Not published";
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export default function PostsPage() {
  const publishedPosts = blogPosts.filter((post) => post.status === "published");
  const featuredPost = publishedPosts[0] ?? blogPosts[0];
  const remainingPosts = blogPosts.filter((post) => post._id !== featuredPost._id);

  return (
    <main className="flex-1 bg-stone-50 px-4 py-10 text-stone-950 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-6 border-b border-stone-200 pb-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-stone-500">
              Latest thinking
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-stone-950 sm:text-5xl">
              Essays for builders, designers, and curious developers.
            </h1>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center sm:min-w-80">
            <div className="border border-stone-200 bg-white px-4 py-3">
              <span className="block text-2xl font-semibold">{blogPosts.length}</span>
              <span className="text-xs font-medium uppercase tracking-[0.16em] text-stone-500">
                Posts
              </span>
            </div>
            <div className="border border-stone-200 bg-white px-4 py-3">
              <span className="block text-2xl font-semibold">{publishedPosts.length}</span>
              <span className="text-xs font-medium uppercase tracking-[0.16em] text-stone-500">
                Live
              </span>
            </div>
            <div className="border border-stone-200 bg-white px-4 py-3">
              <span className="block text-2xl font-semibold">
                {blogPosts.filter((post) => post.status === "draft").length}
              </span>
              <span className="text-xs font-medium uppercase tracking-[0.16em] text-stone-500">
                Drafts
              </span>
            </div>
          </div>
        </div>

        <Link
          href={`/posts/${featuredPost.slug}`}
          className="group mb-10 grid overflow-hidden border border-stone-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_80px_-48px_rgba(41,37,36,0.45)] lg:grid-cols-[1.05fr_0.95fr]"
        >
          <div className="relative aspect-[16/10] overflow-hidden bg-stone-200 lg:aspect-auto">
            <Image
              src={featuredPost.coverImage}
              alt=""
              fill
              sizes="(min-width: 1024px) 52vw, 100vw"
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          </div>

          <article className="flex flex-col justify-between p-6 sm:p-8 lg:p-10">
            <div>
              <div className="mb-5 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
                <span>{featuredPost.status}</span>
                <span className="h-1 w-1 rounded-full bg-stone-300" />
                <span>{formatDate(featuredPost.publishedAt)}</span>
              </div>
              <h2 className="text-3xl font-semibold tracking-tight text-stone-950 sm:text-4xl">
                {featuredPost.title}
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-stone-600">
                {featuredPost.content}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-5">
              <div className="flex flex-wrap gap-2">
                {featuredPost.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="border border-stone-200 bg-stone-50 px-3 py-1 text-xs font-medium text-stone-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span className="text-sm font-semibold text-stone-950 transition group-hover:translate-x-1">
                Read featured
              </span>
            </div>
          </article>
        </Link>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {remainingPosts.map((post) => (
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
                    Read more
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
