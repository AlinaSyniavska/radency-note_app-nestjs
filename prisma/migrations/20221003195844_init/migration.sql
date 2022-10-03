-- CreateEnum
CREATE TYPE "NoteCategoryEnum" AS ENUM ('Task', 'Idea', 'Random_thought');

-- CreateEnum
CREATE TYPE "NoteStatusEnum" AS ENUM ('active', 'archived', 'deleted');

-- CreateTable
CREATE TABLE "Note" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "created" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content" TEXT NOT NULL,
    "dates" TIMESTAMP(3)[],
    "noteStatus" TEXT,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);
