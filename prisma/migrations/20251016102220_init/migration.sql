/*
  Warnings:

  - You are about to drop the column `photo` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `photo` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `photo` on the `Teacher` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Course" DROP COLUMN "photo",
ADD COLUMN     "course_photo" TEXT DEFAULT 'photo.jpg';

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "photo",
ADD COLUMN     "student_photo" TEXT DEFAULT 'photo.jpg';

-- AlterTable
ALTER TABLE "Teacher" DROP COLUMN "photo",
ADD COLUMN     "teacher_photo" TEXT NOT NULL DEFAULT 'photo.jpg';

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "photo" DROP NOT NULL,
ALTER COLUMN "photo" SET DEFAULT 'photo.jpg';
