import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateStudentDto } from './interfaces/create-student.dto';
import { UpdateStudentDto } from './interfaces/update-student.dto';

@Injectable()
export class StudentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createStudentDto: CreateStudentDto, photo: Express.Multer.File) {
    try {
      const file_name = photo.originalname;

      const student = await this.prisma.student.create({
        data: {
          ...createStudentDto,
          student_photo: file_name,
          branch_id: +createStudentDto.branch_id,
          birthday: new Date(createStudentDto.birthday),
        },
      });

      return {
        message: '✅ Student successfully created',
        data: student,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        message: '❌ Failed to create student',
        error: error.message,
      });
    }
  }

  async findAll() {
    try {
      const students = await this.prisma.student.findMany({include: {branch: {include: {courses: true}}}});

      return {
        message: '✅ All students fetched successfully',
        data: students,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        message: '❌ Failed to fetch students',
        error: error.message,
      });
    }
  }

  async findOne(id: string) {
    try {
      const student = await this.prisma.student.findUnique({ where: { id } });

      if (!student)
        throw new NotFoundException(`Student with ID ${id} not found`);

      return {
        message: '✅ Student fetched successfully',
        data: student,
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      throw new InternalServerErrorException({
        message: '❌ Failed to fetch student',
        error: error.message,
      });
    }
  }

  async update(
    id: string,
    updateStudentDto: UpdateStudentDto,
    photo?: Express.Multer.File,
  ) {
    try {
      const existing = await this.prisma.student.findUnique({ where: { id } });
      if (!existing)
        throw new NotFoundException(`Student with ID ${id} not found`);

      let file_name = existing.student_photo;
      if (photo) file_name = photo.originalname;

      const updated = await this.prisma.student.update({
        where: { id },
        data: {
          ...updateStudentDto,
          student_photo: file_name,
          branch_id: Number(updateStudentDto.branch_id),
          birthday: updateStudentDto.birthday
            ? new Date(updateStudentDto.birthday)
            : existing.birthday,
        },
      });

      return {
        message: '✅ Student updated successfully',
        data: updated,
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      throw new InternalServerErrorException({
        message: '❌ Failed to update student',
        error: error.message,
      });
    }
  }

  async remove(id: string) {
    try {
      const existing = await this.prisma.student.findUnique({ where: { id } });
      if (!existing)
        throw new NotFoundException(`Student with ID ${id} not found`);

      const deleted = await this.prisma.student.delete({ where: { id } });

      return {
        message: `✅ Student with ID ${id} deleted successfully`,
        data: deleted,
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      throw new InternalServerErrorException({
        message: '❌ Failed to delete student',
        error: error.message,
      });
    }
  }
}
