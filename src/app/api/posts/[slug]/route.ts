import { connectDB } from "@/lib/db";
import {
  apiError,
  createSlug,
  errorResponse,
  jsonResponse,
  readJson,
} from "@/lib/api";
import CategoryModel from "@/models/Categories";
import PostsModel from "@/models/Posts";
import UserModel from "@/models/Users";
import mongoose from "mongoose";

type UpdatePostBody = {
  title?: string;
  slug?: string;
  content?: string;
  coverImage?: string;
  status?: "draft" | "published" | "archived";
  category?: string | null;
  tags?: string[];
  author?: string | null;
};

async function findPost(slug: string) {
  return PostsModel.findOne({ slug })
    .populate("category", "title slug isActive")
    .populate("author", "firstName lastName username email")
    .lean();
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    await connectDB();

    const { slug } = await params;
    const post = await findPost(slug);

    if (!post) {
      throw apiError("Post not found.", 404);
    }

    return jsonResponse({ data: post });
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
    const body = await readJson<UpdatePostBody>(request);
    const currentPost = await PostsModel.findOne({ slug });

    if (!currentPost) {
      throw apiError("Post not found.", 404);
    }

    const update: Record<string, unknown> = {
      updatedAt: new Date(),
      lastEditedAt: new Date(),
    };

    if (body.title !== undefined) {
      update.title = body.title;
    }

    if (body.slug !== undefined) {
      update.slug = createSlug(body.slug);
    }

    if (body.content !== undefined) {
      update.content = body.content;
    }

    if (body.coverImage !== undefined) {
      update.coverImage = body.coverImage;
    }

    if (body.status !== undefined) {
      update.status = body.status;
      update.publishedAt =
        body.status === "published" && !currentPost.publishedAt
          ? new Date()
          : currentPost.publishedAt;
    }

    if (body.tags !== undefined) {
      update.tags = body.tags;
    }

    if (body.category !== undefined) {
      if (body.category === null) {
        update.category = null;
      } else {
        const category = await CategoryModel.findOne(
          mongoose.isValidObjectId(body.category)
            ? { $or: [{ slug: body.category }, { _id: body.category }] }
            : { slug: body.category },
        ).select("_id");

        if (!category) {
          throw apiError("Category not found.", 404);
        }

        update.category = category._id;
      }
    }

    if (body.author !== undefined) {
      if (body.author === null) {
        update.author = null;
      } else {
        const author = await UserModel.findOne(
          mongoose.isValidObjectId(body.author)
            ? { $or: [{ username: body.author }, { _id: body.author }] }
            : { username: body.author },
        ).select("_id");

        if (!author) {
          throw apiError("Author not found.", 404);
        }

        update.author = author._id;
      }
    }

    const updatedPost = await PostsModel.findOneAndUpdate({ slug }, update, {
      new: true,
      runValidators: true,
    })
      .populate("category", "title slug isActive")
      .populate("author", "firstName lastName username email")
      .lean();

    return jsonResponse({ data: updatedPost });
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
    const deletedPost = await PostsModel.findOneAndDelete({ slug });

    if (!deletedPost) {
      throw apiError("Post not found.", 404);
    }

    if (deletedPost.category) {
      await CategoryModel.updateOne(
        { _id: deletedPost.category },
        { $inc: { postsCount: -1 }, $set: { updatedAt: new Date() } },
      );
    }

    return jsonResponse({ data: { deleted: true, slug } });
  } catch (error) {
    return errorResponse(error);
  }
}
