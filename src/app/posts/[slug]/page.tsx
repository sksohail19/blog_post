import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import posts from "../../../../sample-data/posts.json";
import categories from "../../../../sample-data/categories.json";

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
  lastEditedAt: string;
};

type Category = {
  _id: string;
  title: string;
  slug: string;
  isActive: boolean;
};

const blogPosts = posts as BlogPost[];
const blogCategories = categories as Category[];

function formatDate(value: string | null) {
  if (!value) {
    return "Not published";
  }

  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  const category = blogCategories.find((item) => item._id === post.category);
  const relatedPosts = blogPosts
    .filter((item) => item.category === post.category && item._id !== post._id)
    .slice(0, 3);

  return (
    <main className="flex-1 bg-stone-50 px-4 py-10 text-stone-950 sm:px-6 lg:px-8">
      <article className="mx-auto max-w-4xl">
        <Link
          href="/posts"
          className="mb-8 inline-flex text-sm font-semibold text-stone-600 transition hover:text-stone-950"
        >
          Back to posts
        </Link>

        <header className="border-b border-stone-200 pb-8">
          <div className="mb-5 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
            <span>{post.status}</span>
            <span className="h-1 w-1 rounded-full bg-stone-300" />
            <span>{formatDate(post.publishedAt)}</span>
            {category ? (
              <>
                <span className="h-1 w-1 rounded-full bg-stone-300" />
                <Link
                  href={`/categories/${category.slug}`}
                  className="transition hover:text-stone-950"
                >
                  {category.title}
                </Link>
              </>
            ) : null}
          </div>

          <h1 className="text-4xl font-semibold tracking-tight text-stone-950 sm:text-5xl">
            {post.title}
          </h1>

          <div className="mt-6 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="border border-stone-200 bg-white px-3 py-1 text-xs font-medium text-stone-600"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div className="relative my-8 aspect-[16/9] overflow-hidden border border-stone-200 bg-stone-200">
          <Image
            src={post.coverImage}
            alt=""
            fill
            sizes="(min-width: 1024px) 896px, 100vw"
            className="h-full w-full object-cover"
            priority
          />
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_220px]">
          <div className="bg-white p-6 text-lg leading-8 text-stone-700 sm:p-8">
            <p>{post.content}</p>
            <p className="mt-6">
              This sample page is ready for your real post body. Later you can replace
              this JSON content with database content, MDX, or rich editor output.
            </p>
          </div>

          <aside className="h-fit border border-stone-200 bg-white p-5 text-sm text-stone-600">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-stone-950">
              Post details
            </h2>
            <dl className="grid gap-3">
              {category ? (
                <div className="flex justify-between gap-4">
                  <dt>Category</dt>
                  <dd className="text-right font-semibold text-stone-950">
                    <Link href={`/categories/${category.slug}`} className="hover:text-stone-600">
                      {category.title}
                    </Link>
                  </dd>
                </div>
              ) : null}
              <div className="flex justify-between gap-4">
                <dt>Views</dt>
                <dd className="font-semibold text-stone-950">
                  {post.stats.views.toLocaleString()}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>Likes</dt>
                <dd className="font-semibold text-stone-950">{post.stats.likesCount}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>Comments</dt>
                <dd className="font-semibold text-stone-950">
                  {post.stats.commentsCount}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>Bookmarks</dt>
                <dd className="font-semibold text-stone-950">
                  {post.stats.bookMarksCount}
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </article>

      <section className="mx-auto mt-12 max-w-7xl border-t border-stone-200 pt-10">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
              More in this category
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-stone-950">
              {category ? category.title : "Related posts"}
            </h2>
          </div>

          {category ? (
            <Link
              href={`/categories/${category.slug}`}
              className="text-sm font-semibold text-stone-600 transition hover:text-stone-950"
            >
              View category
            </Link>
          ) : null}
        </div>

        {relatedPosts.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {relatedPosts.map((relatedPost) => (
              <article
                key={relatedPost._id}
                className="flex min-h-full flex-col overflow-hidden border border-stone-200 bg-white"
              >
                <Link href={`/posts/${relatedPost.slug}`} className="group block">
                  <div className="relative aspect-[16/9] overflow-hidden bg-stone-200">
                    <Image
                      src={relatedPost.coverImage}
                      alt=""
                      fill
                      sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                </Link>

                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-4 flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
                    <span>{relatedPost.status}</span>
                    <span>{formatDate(relatedPost.publishedAt)}</span>
                  </div>

                  <h3 className="text-xl font-semibold tracking-tight text-stone-950">
                    <Link
                      href={`/posts/${relatedPost.slug}`}
                      className="transition hover:text-stone-600"
                    >
                      {relatedPost.title}
                    </Link>
                  </h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-stone-600">
                    {relatedPost.content}
                  </p>

                  <div className="mt-auto flex items-center justify-between border-t border-stone-200 pt-5 text-sm text-stone-500">
                    <span>{relatedPost.stats.views.toLocaleString()} views</span>
                    <Link
                      href={`/posts/${relatedPost.slug}`}
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
          <div className="border border-stone-200 bg-white p-6 text-sm text-stone-600">
            No other posts are available in this category yet.
          </div>
        )}
      </section>
    </main>
  );
}
