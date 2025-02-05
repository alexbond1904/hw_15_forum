export default interface NewPostDto {
    title: string,
    content: string,
    tags: Set<string>
}