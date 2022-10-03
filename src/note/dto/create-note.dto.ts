export class CreateNoteDto {
    public name: string;
    public created: Date;
    public category: string;
    public content: string;
    public dates: Date[];
    public noteStatus: string;//not required
}
