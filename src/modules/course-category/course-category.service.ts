import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateCourseCategoryDto } from './interfaces/create-course-category.dto';
import { UpdateCourseCategoryDto } from './interfaces/update-course-category.dto';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Injectable()
export class CourseCategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createCourseCategoryDto: CreateCourseCategoryDto) {
    try {
      const data = await this.prismaService.courseCategory.create({
        data: createCourseCategoryDto,
      });

      return {
        data,
        message: '✅ Successfully created course category',
      };
    } catch (error) {
      throw new InternalServerErrorException({
        message: '❌ Failed to create course category',
        error: error.message,
      });
    }
  }

  async findAll() {
    try {
      const data = await this.prismaService.courseCategory.findMany({
        include: { courses: true },
      });

      return {
        data,
        message: '✅ Successfully fetched all course categories',
      };
    } catch (error) {
      throw new InternalServerErrorException({
        message: '❌ Failed to fetch course categories',
        error: error.message,
      });
    }
  }

  async findOne(id: number) {
    try {
      const data = await this.prismaService.courseCategory.findFirst({
        where: { id },
        include: { courses: true },
      });

      if (!data) {
        throw new NotFoundException(`Course category with ID ${id} not found`);
      }

      return {
        data,
        message: '✅ Successfully fetched one course category',
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException({
        message: '❌ Failed to fetch course category',
        error: error.message,
      });
    }
  }

  async update(id: number, updateCourseCategoryDto: UpdateCourseCategoryDto) {
    try {
      const existing = await this.prismaService.courseCategory.findUnique({ where: { id } });
      if (!existing) throw new NotFoundException(`Course category with ID ${id} not found`);

      const data = await this.prismaService.courseCategory.update({
        where: { id },
        data: updateCourseCategoryDto,
      });

      return {
        data,
        message: '✅ Successfully updated course category',
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException({
        message: '❌ Failed to update course category',
        error: error.message,
      });
    }
  }

  async remove(id: number) {
    try {
      const existing = await this.prismaService.courseCategory.findUnique({ where: { id } });
      if (!existing) throw new NotFoundException(`Course category with ID ${id} not found`);

      const data = await this.prismaService.courseCategory.delete({
        where: { id },
      });

      return {
        data,
        message: '✅ Successfully deleted course category',
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException({
        message: '❌ Failed to delete course category',
        error: error.message,
      });
    }
  }
}
