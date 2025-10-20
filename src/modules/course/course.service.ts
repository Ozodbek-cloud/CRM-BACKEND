import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateCourseDto } from './interfaces/create-course.dto';
import { UpdateCourseDto } from './interfaces/update-course.dto';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Injectable()
export class CourseService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createCourseDto: CreateCourseDto, photo: Express.Multer.File) {
    try {
      const file_name = photo?.originalname || null;

      const data = await this.prismaService.course.create({
        data: {
          ...createCourseDto,
          duration_hours: +createCourseDto.duration_hours,
          duration_months: +createCourseDto.duration_months,
          price: +createCourseDto.price,
          branch_id: +createCourseDto.branch_id,
          category_id: +createCourseDto.category_id,
          course_photo: file_name,
        },
      });

      return {
        message: '✅ Successfully Created Course',
        data,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        message: '❌ Failed to create course',
        error: error.message,
      });
    }
  }

  async findAll() {
    try {
      const data = await this.prismaService.course.findMany({
        include: { category: true },
      });

      return {
        data,
        message: '✅ Successfully fetched all courses',
      };
    } catch (error) {
      throw new InternalServerErrorException({
        message: '❌ Failed to fetch courses',
        error: error.message,
      });
    }
  }

  async findOne(id: number) {
    try {
      const data = await this.prismaService.course.findFirst({
        where: { id },
        include: { category: true },
      });

      if (!data) throw new NotFoundException(`Course with ID ${id} not found`);

      return {
        data,
        message: '✅ Successfully fetched one course',
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException({
        message: '❌ Failed to fetch course',
        error: error.message,
      });
    }
  }

  async update(id: number, updateCourseDto: UpdateCourseDto, photo?: Express.Multer.File) {
    try {
      const existing = await this.prismaService.course.findUnique({ where: { id } });
      if (!existing) throw new NotFoundException(`Course with ID ${id} not found`);

      let file_name = existing.course_photo;
      if (photo) {
        file_name = photo.originalname;
      }

      const updated_data = await this.prismaService.course.update({
        where: { id },
        data: {
          ...updateCourseDto,
          duration_hours: Number(updateCourseDto.duration_hours),
          duration_months: Number(updateCourseDto.duration_months),
          price: Number(updateCourseDto.price),
          branch_id: Number(updateCourseDto.branch_id),
          category_id: Number(updateCourseDto.category_id),
          course_photo: file_name,
        },
      });

      return {
        data: updated_data,
        message: '✅ Successfully updated course',
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException({
        message: '❌ Failed to update course',
        error: error.message,
      });
    }
  }

  async remove(id: number) {
    try {
      const existing = await this.prismaService.course.findUnique({ where: { id } });
      if (!existing) throw new NotFoundException(`Course with ID ${id} not found`);

      const data = await this.prismaService.course.delete({ where: { id } });

      return {
        data,
        message: '✅ Successfully deleted course',
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException({
        message: '❌ Failed to delete course',
        error: error.message,
      });
    }
  }
}
