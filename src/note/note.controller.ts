import {Controller, Get} from '@nestjs/common';
import {NoteService} from "./note.service";

@Controller('notes')
export class NoteController {
    constructor(private readonly noteService:NoteService) {
    }

    @Get()
    getAll() {
        return this.noteService.getAll();
    }
}
