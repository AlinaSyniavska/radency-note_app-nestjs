import {Injectable} from '@nestjs/common';
import {Note, Prisma} from '@prisma/client';

import {PrismaService} from "../core/prisma.service";
import {UpdateNoteDto} from "./dto/update-note.dto";

@Injectable()
export class NoteService {
    constructor(private prismaService: PrismaService) {
    }

    async getAll(): Promise<Note[]> {
        return this.prismaService.note.findMany();
    }

    async getById(noteId: string): Promise<Note> {
        return this.prismaService.note.findUnique({
            where: {id: noteId}
        });
    }

    async createNote(data: Prisma.NoteCreateInput): Promise<Note> {
        return this.prismaService.note.create({
            data,
        });
    }

    async updateNote(data: UpdateNoteDto, noteId: string): Promise<Note> {
        return this.prismaService.note.update({
            where: {id: noteId},
            data: {
                name: data.name,
                created: data.created,
                category: data.category,
                content: data.content,
                dates: data.dates,
                noteStatus: data.noteStatus,
            }
        });
    }

    async deleteNote(noteId: string) {
        return this.prismaService.note.delete({
            where: {id: noteId}
        });
    }
}
