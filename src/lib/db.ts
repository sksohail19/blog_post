import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL ?? "";

if (!MONGODB_URL) {
  throw new Error("Please define the MONGODB_URL environment variable in .env.local");
}

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

const cached = globalThis.mongooseCache ?? {
  conn: null,
  promise: null,
};

globalThis.mongooseCache = cached;

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URL, {
      dbName: "blog_platform",
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
