import mongoose from 'mongoose';
import { Schema } from 'mongoose';

export const CategorySchema = new Schema({
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
    isActive: {
        type: Boolean,
        default: true,
    },
    postsCount: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    lastPostAddedAt: {
        type: Date,
        default: null,
    }
});

const CategoryModel = mongoose.models.Category || mongoose.model("Category", CategorySchema);
export default CategoryModel;
