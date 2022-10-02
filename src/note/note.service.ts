import {Injectable} from '@nestjs/common';

@Injectable()
export class NoteService {
    constructor() {
    }

    async getAll() {
        return [];
    }

    async getById(id: string) {

    }
}
