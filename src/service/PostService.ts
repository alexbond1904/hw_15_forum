import PostDto from "../dto/PostDto";

export default interface PostService {
    createPost(author: string, title: string, content: string, tags: Set<string>): Promise<PostDto>;

    findPostById(id: string): Promise<PostDto>;

    updatePost(id: string, title: string | undefined, content: string | undefined, tags: Set<string> | undefined): Promise<PostDto>;

    deletePost(id: string): Promise<PostDto>;

    findPostsByAuthor(author: string): Promise<PostDto[]>;

    findPostsByTags(tags: Set<string>): Promise<PostDto[]>;

    findPostsByPeriod(from: Date, to?: Date): Promise<PostDto[]>;

    addComment(postId: string, user: string, message: string): Promise<PostDto>;

    addLike(postId: string): Promise<{ result: string }>;
}