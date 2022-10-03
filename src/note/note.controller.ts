import {Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res} from '@nestjs/common';
import {Response} from "express";

import {NoteService} from "./note.service";
import {CreateNoteDto} from "./dto/create-note.dto";
import {UpdateNoteDto} from "./dto/update-note.dto";

@Controller('notes')
export class NoteController {
    constructor(private readonly noteService: NoteService) {
    }

    @Get()
    getAll() {
        return this.noteService.getAll();
    }

    @Post()
    create(@Body() newNote: CreateNoteDto) {
        return this.noteService.createNote(newNote);
    }

    @Get('/:id')
    getById(@Param('id') id: string) {
        return this.noteService.getById(id);
    }

    @Patch('/:id')
    update(@Body() data: UpdateNoteDto, @Param('id') id: string){
        return this.noteService.updateNote(data, id);
    }

    @Delete('/:id')
    async delete(@Param('id') id: string, @Res() response: Response) {
         await this.noteService.deleteNote(id);
        response
            .status(HttpStatus.NO_CONTENT)
            .send('Note was deleted');
        return;
    }
}
