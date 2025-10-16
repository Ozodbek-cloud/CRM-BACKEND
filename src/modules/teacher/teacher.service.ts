import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeacherDto } from './interfaces/create-teacher.dto';
import { UpdateTeacherDto } from './interfaces/update-teacher.dto';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Injectable()
export class TeacherService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTeacherDto: CreateTeacherDto, photo: Express.Multer.File) {
    let file_name = photo.filename
    const teacher = await this.prisma.teacher.create({ data: {...createTeacherDto, teacher_photo:file_name} });
    return { message: 'Teacher successfully created', data: teacher };
  }

  async findAll() {
    const teachers = await this.prisma.teacher.findMany();
    return { message: 'All teachers fetched successfully', data: teachers };
  }

  async findOne(id: number) {
    const teacher = await this.prisma.teacher.findUnique({ where: { id } });
    if (!teacher) throw new NotFoundException(`Teacher with ID ${id} not found`);
    return { message: 'Teacher fetched successfully', data: teacher };
  }

  async update(id: number, updateTeacherDto: UpdateTeacherDto, photo: Express.Multer.File) {
    const existing = await this.prisma.teacher.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException(`Teacher with ID ${id} not found`);

    let file_name = existing.teacher_photo;
    if (photo) {
      file_name = photo.originalname;
    }

    const updated = await this.prisma.teacher.update({ where: { id }, data: {...updateTeacherDto, teacher_photo: file_name} });
    return { message: 'Teacher updated successfully', data: updated };
  }

  async remove(id: number) {
    const existing = await this.prisma.teacher.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException(`Teacher with ID ${id} not found`);
    await this.prisma.teacher.delete({ where: { id } });
    return { message: `Teacher with ID ${id} deleted successfully` };
  }
}
