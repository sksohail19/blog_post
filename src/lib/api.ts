import mongoose from "mongoose";
import { NextResponse } from "next/server";

type ApiError = {
  message: string;
  status?: number;
};

export function jsonResponse<T>(data: T, init?: ResponseInit) {
  return NextResponse.json(data, init);
}

export function errorResponse(error: unknown) {
  console.error(error);

  if (isApiError(error)) {
    return NextResponse.json(
      { error: error.message },
      { status: error.status ?? 500 },
    );
  }

  if (error instanceof mongoose.Error.ValidationError) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  if (isMongoDuplicateKeyError(error)) {
    return NextResponse.json(
      { error: "A record with this unique value already exists." },
      { status: 409 },
    );
  }

  return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
}

export function apiError(message: string, status = 400): ApiError {
  return { message, status };
}

export async function readJson<T>(request: Request): Promise<T> {
  try {
    return (await request.json()) as T;
  } catch {
    throw apiError("Request body must be valid JSON.");
  }
}

export function createSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function toPositiveInt(value: string | null, fallback: number, max: number) {
  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed < 1) {
    return fallback;
  }

  return Math.min(parsed, max);
}

export function mongoIdVariants(id: unknown) {
  const values = [id];

  if (id && typeof id === "object" && "toString" in id) {
    values.push(id.toString());
  }

  return [...new Set(values)];
}

function isApiError(error: unknown): error is ApiError {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as ApiError).message === "string" &&
    "status" in error
  );
}

function isMongoDuplicateKeyError(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: number }).code === 11000
  );
}
