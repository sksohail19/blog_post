import { Schema } from 'mongoose';
import mongoose from 'mongoose';

export const CommentSchema = new Schema({
    content: {
        type: String,
        required: true,
        trim: true,
    },
    post: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Post',
    },
    author: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    authorSnapshot: {
        fullName: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        profileImage: {
            type: String,
            default: "",
        },
    },
    parentComment: {
        type: Schema.Types.ObjectId,
        default: null,
        ref: 'Comment',
    },
    isEdited: {
        type: Boolean,
        default: false,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
})

const CommentModel = mongoose.models.Comment || mongoose.model("Comment", CommentSchema);
export default CommentModel;
