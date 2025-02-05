import {Document, Schema, model} from 'mongoose';
import PostDto from "../dto/PostDto";

export interface IPost extends Omit<PostDto, 'id'>, Document {
}

const postSchema = new Schema<IPost>(
    {
        title: {type: String, required: true},
        content: {type: String, required: true},
        author: {type: String, required: true},
        dateCreated: {type: Date, default: Date.now},
        tags: {type: [String], required: true},
        likes: {type: Number, default: 0},
        comments: [{
            user: {type: String, required: true},
            message: {type: String, required: true},
            dateCreated: {type: Date, default: Date.now},
            likes: {type: Number, default: 0}
        }]
    },
    {
        versionKey: false,
    }
);

export const Post = model<IPost>('post', postSchema);