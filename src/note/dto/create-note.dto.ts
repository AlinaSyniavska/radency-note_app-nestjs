export class CreateNoteDto {
    public name: string;
    public created: string;
    public category: string;
    public content: string;
    // public dates: string[];
    public noteStatus: string;//not required
}
