import { Module } from '@nestjs/common';

import { NoteController } from './note.controller';
import { NoteService } from './note.service';
import {PrismaService} from "../core/prisma.service";
import {HelperService} from "../core/helper.service";

@Module({
  controllers: [NoteController],
  providers: [NoteService, PrismaService, HelperService]
})
export class NoteModule {}
