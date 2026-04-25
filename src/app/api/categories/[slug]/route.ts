import { connectDB } from "@/lib/db";
import {
  apiError,
  createSlug,
  errorResponse,
  jsonResponse,
  mongoIdVariants,
  readJson,
} from "@/lib/api";
import CategoryModel from "@/models/Categories";
import PostsModel from "@/models/Posts";

type UpdateCategoryBody = {
  title?: string;
  slug?: string;
  isActive?: boolean;
};

async function getCategoryWithPosts(slug: string, includePosts: boolean) {
  const category = await CategoryModel.findOne({ slug }).lean();

  if (!category) {
    return null;
  }

  if (!includePosts) {
    return { category };
  }

  const posts = await PostsModel.find({ category: { $in: mongoIdVariants(category._id) } })
    .sort({ publishedAt: -1, createdAt: -1 })
    .select("title slug content coverImage status tags stats publishedAt")
    .lean();

  return { category, posts };
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    await connectDB();

    const { slug } = await params;
    const { searchParams } = new URL(request.url);
    const includePosts = searchParams.get("includePosts") !== "false";
    const result = await getCategoryWithPosts(slug, includePosts);

    if (!result) {
      throw apiError("Category not found.", 404);
    }

    return jsonResponse({ data: result });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    await connectDB();

    const { slug } = await params;
    const body = await readJson<UpdateCategoryBody>(request);
    const update: Record<string, unknown> = { updatedAt: new Date() };

    if (body.title !== undefined) {
      update.title = body.title;
    }

    if (body.slug !== undefined) {
      update.slug = createSlug(body.slug);
    }

    if (body.isActive !== undefined) {
      update.isActive = body.isActive;
    }

    const category = await CategoryModel.findOneAndUpdate({ slug }, update, {
      new: true,
      runValidators: true,
    }).lean();

    if (!category) {
      throw apiError("Category not found.", 404);
    }

    return jsonResponse({ data: category });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    await connectDB();

    const { slug } = await params;
    const category = await CategoryModel.findOne({ slug });

    if (!category) {
      throw apiError("Category not found.", 404);
    }

    const postsCount = await PostsModel.countDocuments({
      category: { $in: mongoIdVariants(category._id) },
    });

    if (postsCount > 0) {
      throw apiError("Cannot delete a category that still has posts.", 409);
    }

    await category.deleteOne();

    return jsonResponse({ data: { deleted: true, slug } });
  } catch (error) {
    return errorResponse(error);
  }
}
