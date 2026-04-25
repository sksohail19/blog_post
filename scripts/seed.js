/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

const MONGODB_URL = "mongodb://localhost:27017/";
const DB_NAME = "blog_platform";
const SAMPLE_DIR = path.join(__dirname, "..", "sample-data");

if (!MONGODB_URL) {
  throw new Error("Please define the MONGODB_URL environment variable before running the seed script.");
}

function loadJson(fileName) {
  const filePath = path.join(SAMPLE_DIR, fileName);
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function objectId(value) {
  return value ? new mongoose.Types.ObjectId(value) : value;
}

function prepareCategories(categories) {
  return categories.map((category) => ({
    ...category,
    _id: objectId(category._id),
  }));
}

function prepareUsers(users) {
  return users.map((user) => ({
    ...user,
    _id: objectId(user._id),
  }));
}

function preparePosts(posts) {
  return posts.map((post) => ({
    ...post,
    _id: objectId(post._id),
    category: objectId(post.category),
    author: objectId(post.author),
  }));
}

function prepareComments(comments) {
  return comments.map((comment) => ({
    ...comment,
    _id: objectId(comment._id),
    post: objectId(comment.post),
    author: objectId(comment.author),
    parentComment: objectId(comment.parentComment),
  }));
}

async function seedCollection(db, collectionName, docs) {
  const collection = db.collection(collectionName);
  await collection.deleteMany({});
  if (docs.length > 0) {
    await collection.insertMany(docs, { ordered: true });
  }
  console.log(`Seeded ${docs.length} documents into ${collectionName}`);
}

async function main() {
  const categories = prepareCategories(loadJson("categories.json"));
  const users = prepareUsers(loadJson("users.json"));
  const posts = preparePosts(loadJson("posts.json"));
  const comments = prepareComments(loadJson("comments.json"));

  await mongoose.connect(MONGODB_URL, {
    dbName: DB_NAME,
    bufferCommands: false,
  });

  const db = mongoose.connection.db;

  await seedCollection(db, "categories", categories);
  await seedCollection(db, "users", users);
  await seedCollection(db, "posts", posts);
  await seedCollection(db, "comments", comments);

  console.log("MongoDB seed completed successfully.");
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
