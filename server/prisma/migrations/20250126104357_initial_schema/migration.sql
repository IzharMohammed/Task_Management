-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('TODO', 'INPROGRES', 'COMPLETED');

-- CreateEnum
CREATE TYPE "CategoryStatus" AS ENUM ('Work', 'Personal');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "photoUrl" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tasks" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" "CategoryStatus" NOT NULL,
    "DueOn" TIMESTAMP(3) NOT NULL,
    "taskStatus" "TaskStatus" NOT NULL DEFAULT 'TODO',
    "order" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TagToTasks" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_TagToTasks_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE INDEX "_TagToTasks_B_index" ON "_TagToTasks"("B");

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TagToTasks" ADD CONSTRAINT "_TagToTasks_A_fkey" FOREIGN KEY ("A") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TagToTasks" ADD CONSTRAINT "_TagToTasks_B_fkey" FOREIGN KEY ("B") REFERENCES "Tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
