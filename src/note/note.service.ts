import {HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import {Note, Prisma} from '@prisma/client';

import {PrismaService} from "../core/prisma.service";
import {UpdateNoteDto} from "./dto/update-note.dto";
import {IStats} from "../interfaces/statistics.interface";

@Injectable()
export class NoteService {
    constructor(private prismaService: PrismaService) {
    }

    async getAll(): Promise<Note[]> {
        return this.prismaService.note.findMany();
    }

    async getById(noteId: string): Promise<Note> {
        const isValidId = this.isValidUUID(noteId);
        if (!isValidId) {
            throw new HttpException('Not valid ID', HttpStatus.BAD_REQUEST);
        }

        const note = await this.isNotePresent(noteId);
        if (!note) {
            throw new HttpException(`Note with id ${noteId} not found`, HttpStatus.BAD_REQUEST);
        }

        return note;
    }

    async createNote(data: Prisma.NoteCreateInput): Promise<Note> {
        return this.prismaService.note.create({
            data,
        });
    }

    async updateNote(data: UpdateNoteDto, noteId: string): Promise<Note> {
        const isValidId = this.isValidUUID(noteId);
        if (!isValidId) {
            throw new HttpException('Not valid ID', HttpStatus.BAD_REQUEST);
        }

        const note = await this.isNotePresent(noteId);
        if (!note) {
            throw new NotFoundException();
        }

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
        const isValidId = this.isValidUUID(noteId);
        if (!isValidId) {
            throw new HttpException('Not valid ID', HttpStatus.BAD_REQUEST);
        }

        const note = await this.isNotePresent(noteId);
        if (!note) {
            throw new HttpException(`Note with id ${noteId} not found`, HttpStatus.BAD_REQUEST);
        }

        return this.prismaService.note.delete({
            where: {id: noteId}
        });
    }

    async getStatusStatistics(status: string): Promise<IStats[]> {
        const groupNotes = await this.prismaService.note.groupBy({
            by: ['category', 'noteStatus'],
            where: {
                noteStatus: status,
            },
            _count: {
                noteStatus: true,
            },
        })

        return groupNotes.map(item => {
            return {
                category: item.category,
                status: item.noteStatus,
                total: item._count.noteStatus,
            }
        });
    }

    private isValidUUID(id: string): Boolean {
        const UUID_REGEX_PATTERN = new RegExp("^[{]?[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}[}]?$");
        if (id == null) {
            return false;
        }
        return UUID_REGEX_PATTERN.test(id);
    }

    private async isNotePresent(noteId: string): Promise<Note> {
        return this.prismaService.note.findUnique({
            where: {id: noteId}
        });
    }
}
