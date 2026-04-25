import { connectDB } from "@/lib/db";
import {
  apiError,
  createSlug,
  errorResponse,
  jsonResponse,
  mongoIdVariants,
  readJson,
  toPositiveInt,
} from "@/lib/api";
import CategoryModel from "@/models/Categories";
import PostsModel from "@/models/Posts";
import UserModel from "@/models/Users";
import mongoose from "mongoose";

type CreatePostBody = {
  title?: string;
  slug?: string;
  content?: string;
  coverImage?: string;
  status?: "draft" | "published" | "archived";
  category?: string;
  tags?: string[];
  author?: string;
};

export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = toPositiveInt(searchParams.get("page"), 1, 10_000);
    const limit = toPositiveInt(searchParams.get("limit"), 12, 50);
    const status = searchParams.get("status");
    const category = searchParams.get("category");
    const q = searchParams.get("q");

    const filter: Record<string, unknown> = {};

    if (status) {
      filter.status = status;
    }

    if (category) {
      const categoryDoc = await CategoryModel.findOne(
        mongoose.isValidObjectId(category)
          ? { $or: [{ slug: category }, { _id: category }] }
          : { slug: category },
      ).select("_id");

      if (!categoryDoc) {
        return jsonResponse({
          data: [],
          pagination: { page, limit, total: 0, pages: 0 },
        });
      }

      filter.category = { $in: mongoIdVariants(categoryDoc._id) };
    }

    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: "i" } },
        { content: { $regex: q, $options: "i" } },
      ];
    }

    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      PostsModel.find(filter)
        .sort({ publishedAt: -1, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("category", "title slug isActive")
        .populate("author", "firstName lastName username email")
        .lean(),
      PostsModel.countDocuments(filter),
    ]);

    return jsonResponse({
      data: items,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await readJson<CreatePostBody>(request);

    if (!body.title) {
      throw apiError("Post title is required.");
    }

    if (!body.content) {
      throw apiError("Post content is required.");
    }

    const category = body.category
      ? await CategoryModel.findOne(
          mongoose.isValidObjectId(body.category)
            ? { $or: [{ slug: body.category }, { _id: body.category }] }
            : { slug: body.category },
        )
      : null;

    const author = body.author
      ? await UserModel.findOne(
          mongoose.isValidObjectId(body.author)
            ? { $or: [{ username: body.author }, { _id: body.author }] }
            : { username: body.author },
        ).select("_id")
      : null;

    const post = await PostsModel.create({
      title: body.title,
      slug: body.slug ? createSlug(body.slug) : createSlug(body.title),
      content: body.content,
      coverImage: body.coverImage ?? "",
      status: body.status ?? "draft",
      category: category?._id ?? null,
      tags: body.tags ?? [],
      author: author?._id ?? null,
      publishedAt: body.status === "published" ? new Date() : null,
      lastEditedAt: new Date(),
    });

    if (category) {
      await CategoryModel.updateOne(
        { _id: category._id },
        {
          $inc: { postsCount: 1 },
          $set: { lastPostAddedAt: new Date(), updatedAt: new Date() },
        },
      );
    }

    const createdPost = await PostsModel.findById(post._id)
      .populate("category", "title slug isActive")
      .populate("author", "firstName lastName username email")
      .lean();

    return jsonResponse({ data: createdPost }, { status: 201 });
  } catch (error) {
    return errorResponse(error);
  }
}
