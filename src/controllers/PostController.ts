import {Body, Controller, Delete, Get, Param, Post, Put} from "routing-controllers";
import NewPostDto from "../dto/NewPostDto";
import PostService from "../service/PostService";
import PostServiceImpl from "../service/PostServiceImpl";
import CommentDto from "../dto/CommentDto";

@Controller('/forum')
export default class PostController {
    postService:PostService = new PostServiceImpl();

    @Post("/post/:author")
    async createPost(@Param('author') author:string, @Body() newPostDto: NewPostDto){
        return await this.postService.createPost(author,newPostDto.title , newPostDto.content, newPostDto.tags);
    }

    @Get("/post/:id")
    async findPostById(@Param('id') id:string){
        return await this.postService.findPostById(id);
    }

    @Put("/post/:id")
    async updatePost(@Param('id') id:string, @Body() updatePostDto: Partial<NewPostDto>){
        return await this.postService.updatePost(id, updatePostDto.title, updatePostDto.content, updatePostDto.tags);
    }

    @Delete("/post/:id")
    async deletePost(@Param('id') id: string){
        return await this.postService.deletePost(id);
    }

    @Get("/posts/author/:author")
    async findPostsByAuthor(@Param('author') author:string){
        return await this.postService.findPostsByAuthor(author);
    }

    @Post("/posts/tags")
    async findPostsByTags(@Body() tags:string[]){
        return await this.postService.findPostsByTags(new Set(tags));
    }

    @Post("/posts/period")
    async findPostsByPeriod( @Body() date: { "dateFrom": string, "dateTo": string } ) {
        return await this.postService.findPostsByPeriod(new Date(date.dateFrom), new Date(date.dateTo));
    }

    @Put("/post/:postId/comment/:user")
    async addComment(@Param('postId') postId: string, @Param('user') user: string,  @Body() comment: { message: string } ) {
        return await this.postService.addComment(postId, user, comment.message);
    }

    @Put("/post/:postId/like")
    async addLike(@Param('postId') postId: string ) {
        return await this.postService.addLike(postId);
    }
}