import PostService from "./PostService";
import PostDto from "../dto/PostDto";
import {IPost, Post as P} from "../models/Post";
import CommentDto from "../dto/CommentDto";

export default class PostServiceImpl implements PostService {
    async createPost(author: string, title: string, content: string, tags: Set<string>): Promise<PostDto> {
        const newPost = new P({
            title: title,
            content: content,
            author: author,
            tags: tags
        });
        await newPost.save();
        if (!newPost.id) throw new Error("Error saving DB");
        return this.mapToDto(newPost);
    }

    async findAllPosts(): Promise<PostDto[]> {
        const posts = await P.find({});
        return posts.map(post => {
           return this.mapToDto(post);
        });
    }

    async findPostById(id: string): Promise<PostDto> {
        const post = await this.findPost(id);
        return this.mapToDto(post);
    }

    async updatePost(id: string, title: string | undefined, content: string | undefined, tags: Set<string> | undefined): Promise<PostDto> {
        if(!title && !content && !tags) throw new Error(`Error in request: not valid fields for updating`);

        const post = await this.findPost(id);

        post.title = title || post.title;
        post.content = content || post.content;
        if(tags) post.tags = Array.from(tags) || post.tags;


        const updatedPost = await post.save();
        if (!updatedPost) throw new Error("Error saving update in DB");

        return new PostDto(
            post.id,
            post.title,
            post.content,
            post.author,
            post.dateCreated,
            Array.from(post.tags || []),
            post.likes,
            post.comments.map(c => new CommentDto(c.user, c.message, c.likes, c.dateCreated)));
    }

    async deletePost(id: string): Promise<PostDto> {
        const post = await P.findByIdAndDelete(id);
        if (!post) throw new Error(`Post with id ${id} not found`);

        return new PostDto(
            post.id,
            post.title,
            post.content,
            post.author,
            post.dateCreated,
            Array.from(post.tags || []),
            post.likes,
            post.comments.map(c => new CommentDto(c.user, c.message, c.likes, c.dateCreated))        );
    }

    async findPostsByAuthor(author: string): Promise<PostDto[]> {
        const res = await P.find({author: author});
        return res.map(r=> {
            return new PostDto(
                r.id,
                r.title,
                r.content,
                r.author,
                r.dateCreated,
                Array.from(r.tags || []),
                r.likes,
                r.comments.map(c => new CommentDto(c.user, c.message, c.likes, c.dateCreated))            );
        })
    }

    async findPostsByPeriod(from: Date, to: Date = new Date()): Promise<PostDto[]> {
        const res = await P.find({dateCreated: {$gt:from, $lt:to}});
        return res.map(r=> {
            return new PostDto(
                r.id,
                r.title,
                r.content,
                r.author,
                r.dateCreated,
                Array.from(r.tags || []),
                r.likes,
                r.comments.map(c => new CommentDto(c.user, c.message, c.likes, c.dateCreated))            );
        })
    }

    async findPostsByTags(tags: Set<string>): Promise<PostDto[]> {
        const res = await P.find({ tags: { $in: Array.from(tags) } });
        return res.map(r=> {
            return new PostDto(
                r.id,
                r.title,
                r.content,
                r.author,
                r.dateCreated,
                Array.from(r.tags || []),
                r.likes,
                r.comments.map(c => new CommentDto(c.user, c.message, c.likes, c.dateCreated))            );
        })
    }

    async addComment(postId: string, user: string, message: string): Promise<PostDto> {
        const post = await this.findPost(postId);
        post.comments.push({ user, message } as CommentDto);
        await post.save();
        return new PostDto(
            post.id,
            post.title,
            post.content,
            post.author,
            post.dateCreated,
            Array.from(post.tags || []),
            post.likes,
            post.comments.map(c => new CommentDto(c.user, c.message, c.likes, c.dateCreated))
        );
    };

    async addLike(postId: string): Promise<{ result: string }> {
        const post = await this.findPost(postId);
        post.likes = post.likes + 1;
        await post.save();
        return Promise.resolve({result: "Like added +1"});
    }


    async findPost (id: string) {
        const post = await P.findById(id);
        if (!post) throw new Error(`Post with id ${id} not found`);
        return post;
    }

    mapToDto (post: IPost): PostDto {
        return new PostDto(
            post.id,
            post.title,
            post.content,
            post.author,
            post.dateCreated,
            Array.from(post.tags || []),
            post.likes,
            post.comments.map(c => new CommentDto(c.user, c.message, c.likes, c.dateCreated))
        );
    }

}