import { connectDB } from "@/lib/db";
import {
  apiError,
  createSlug,
  errorResponse,
  jsonResponse,
  readJson,
} from "@/lib/api";
import CategoryModel from "@/models/Categories";

type CreateCategoryBody = {
  title?: string;
  slug?: string;
  isActive?: boolean;
};

export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const active = searchParams.get("active");
    const filter: Record<string, unknown> = {};

    if (active === "true") {
      filter.isActive = true;
    }

    if (active === "false") {
      filter.isActive = false;
    }

    const items = await CategoryModel.find(filter)
      .sort({ title: 1 })
      .lean();

    return jsonResponse({ data: items });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await readJson<CreateCategoryBody>(request);

    if (!body.title) {
      throw apiError("Category title is required.");
    }

    const category = await CategoryModel.create({
      title: body.title,
      slug: body.slug ? createSlug(body.slug) : createSlug(body.title),
      isActive: body.isActive ?? true,
      updatedAt: new Date(),
    });

    return jsonResponse({ data: category }, { status: 201 });
  } catch (error) {
    return errorResponse(error);
  }
}
