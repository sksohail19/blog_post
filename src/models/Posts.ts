import mongoose from 'mongoose';
import {  Schema } from 'mongoose';

type PostStatus = 'draft' | 'published' | 'archived';

const PostStats = new Schema({
    views: {
        type: Number,
        default: 0,
    },
    likesCount: {
        type: Number,
        default: 0,
    },
    commentsCount: {
        type: Number,
        default: 0,
    },
    bookMarksCount: {
        type: Number,
        default: 0,
    }
}, {_id: false});

export const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    content: {
        type: String,
        required: true,
        trim: true,
    },
    coverImage: {
        type: String,
        default: '',
    },
    status: {
        type: String,
        enum: ['draft', 'published', 'archived'],
        default: 'draft',
    },
    category: {
        type: Schema.Types.ObjectId,
        default: '',
        ref: 'Category',
    },
    tags: {
        type: [String],
        default: [],
    },
    author: {
        type: Schema.Types.ObjectId,
        default: null,
        ref: 'User',
    },
    stats: {
        type: PostStats,
        default: {
            views: 0,
            likesCount: 0,
            commentsCount: 0,
            bookMarksCount: 0,
        }
    },
    publishedAt: {
        type: Date,
        default: null,
    },
    lastEditedAt: {
        type: Date,
        default: null,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});

const PostsModel = mongoose.model("Post", PostSchema);
export default PostsModel;