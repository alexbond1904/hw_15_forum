import CommentDto from "./CommentDto";

export default class PostDto {
    id: string;
    title: string;
    content: string;
    author: string;
    dateCreated: Date;
    tags: string[];
    likes: number;
    comments: CommentDto[];

    constructor(id: string,
                title: string,
                content: string,
                author: string,
                dateCreated: Date = new Date(),
                tags: string[] = [],
                likes: number = 0,
                comments: CommentDto[] = []) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.author = author;
        this.dateCreated = dateCreated;
        this.tags = tags;
        this.likes = likes;
        this.comments = comments;
    }
}