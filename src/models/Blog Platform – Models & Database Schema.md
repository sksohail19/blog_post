# Blog Platform – Models & Database Schema

This document defines the **core database models**, their **schemas**, and the **relationships** between them for the blog platform.

The system is built using:

- Next.js
- MongoDB
- Mongoose

---

# Models Overview

The application uses the following core collections:

- `users`
- `posts`
- `categories`
- `comments`

---

# Entity Relationships

```text
User (1) ---------> (Many) Posts
User (1) ---------> (Many) Comments
Category (1) -----> (Many) Posts
Post (1) ---------> (Many) Comments
Comment (1) ------> (Many) Replies

---
# User Model
```text
{
  _id: ObjectId,

  fullName: String,
  username: String,
  email: String,
  password: String, // hashed

  profileImage: String,
  bio: String,

  role: "user" | "admin",
  isVerified: Boolean,
  isBlocked: Boolean,

  socialLinks: {
    website: String,
    twitter: String,
    linkedin: String,
    github: String
  },

  stats: {
    totalPosts: Number,
    totalPublishedPosts: Number,
    totalViews: Number
  },

  createdAt: Date,
  updatedAt: Date
}

# Posts
{
  _id: ObjectId,

  title: String,
  slug: String,
  excerpt: String,

  content: Mixed, // TipTap JSON or HTML

  coverImage: String,

  status: "draft" | "published" | "archived",
  visibility: "public" | "private" | "unlisted",

  category: ObjectId, // ref Category

  tags: [String],

  author: ObjectId, // ref User

  authorSnapshot: {
    fullName: String,
    username: String,
    profileImage: String
  },

  seo: {
    metaTitle: String,
    metaDescription: String
  },

  stats: {
    views: Number,
    likesCount: Number,
    commentsCount: Number,
    bookmarksCount: Number
  },

  readingTime: Number,

  publishedAt: Date,
  lastEditedAt: Date,

  createdAt: Date,
  updatedAt: Date
}

# Categories
{
  _id: ObjectId,

  name: String,
  slug: String,
  description: String,
  color: String,

  isActive: Boolean,
  postsCount: Number,

  createdAt: Date,
  updatedAt: Date
}

# Comment
{
  _id: ObjectId,

  content: String,

  post: ObjectId,   // ref Post
  author: ObjectId, // ref User

  authorSnapshot: {
    fullName: String,
    username: String,
    profileImage: String
  },

  parentComment: ObjectId | null, // reply system

  isEdited: Boolean,
  isDeleted: Boolean,

  createdAt: Date,
  updatedAt: Date
}