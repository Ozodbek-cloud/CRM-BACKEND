import { Module } from '@nestjs/common';
import { CourseCategoryService } from './course-category.service';
import { CourseCategoryController } from './course-category.controller';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Module({
  controllers: [CourseCategoryController],
  providers: [CourseCategoryService, PrismaService],
})
export class CourseCategoryModule {}
