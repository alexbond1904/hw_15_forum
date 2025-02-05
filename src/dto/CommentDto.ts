
export interface ICommentDto {
    user: string;
    message: string;
    dateCreated: Date;
    likes: number;
}

export default class CommentDto implements ICommentDto{
    user: string;
    message: string;
    dateCreated: Date;
    likes: number;

    constructor(user: string, message: string, likes: number = 0, dateCreated: Date = new Date) {
        this.user = user;
        this.message = message;
        this.likes = likes;
        this.dateCreated = dateCreated;
    }
}