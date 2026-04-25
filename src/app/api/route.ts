import { jsonResponse } from "@/lib/api";

export function GET() {
  return jsonResponse({
    name: "Blog Platform API",
    endpoints: {
      posts: {
        list: "/api/posts",
        detail: "/api/posts/:slug",
        query: {
          page: "Page number, default 1",
          limit: "Items per page, default 12, max 50",
          status: "draft | published | archived",
          category: "Category slug or id",
          q: "Search title/content",
        },
      },
      categories: {
        list: "/api/categories",
        detail: "/api/categories/:slug",
        query: {
          active: "true | false",
          includePosts: "true | false on detail endpoint",
        },
      },
    },
  });
}
