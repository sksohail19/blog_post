import mongoose from 'mongoose';
import { Schema } from 'mongoose';

// Mongoose schemas for nested types
const SocialLinksSchema = new Schema({
    twitter: {
        type: String,
        default: '',
    },
    facebook: {
        type: String,
        default: '',
    },
    linkedin: {
        type: String,
        default: '',
    },
    instagram: {
        type: String,
        default: '',
    }
}, { _id: false });

const UserStatsSchema = new Schema({
    totalPosts: {
        type: Number,
        default: 0,
    },
    totalPublishedPosts: {
        type: Number,
        default: 0,
    },
    totalViews: {
        type: Number,
        default: 0,
    },
    totalLikes: {
        type: Number,
        default: 0,
    },
    totalComments: {
        type: Number,
        default: 0,
    }
}, { _id: false });

export const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        trim: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: /.+\@.+\..+/,
    },
    phoneNumber: {
        type: String,
        default: '',
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    bio: {
        type: String,
        maxLength: 500,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },

    socialLinks: {
        type: SocialLinksSchema,
        default: {},
    },

    stats: {
        type: UserStatsSchema,
        default: {},
    },
}, { timestamps: true });

const UserModel = mongoose.models.User || mongoose.model("User", UserSchema);
export default UserModel;
