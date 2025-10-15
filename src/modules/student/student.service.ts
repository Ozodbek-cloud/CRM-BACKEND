import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './interfaces/create-student.dto';
import { UpdateStudentDto } from './interfaces/update-student.dto';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Injectable()
export class StudentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createStudentDto: CreateStudentDto) {
    const student = await this.prisma.student.create({ data: createStudentDto });
    return { message: 'Student successfully created', data: student };
  }

  async findAll() {
    const students = await this.prisma.student.findMany();
    return { message: 'All students fetched successfully', data: students };
  }

  async findOne(id: string) {
    const student = await this.prisma.student.findUnique({ where: { id } });
    if (!student) throw new NotFoundException(`Student with ID ${id} not found`);
    return { message: 'Student fetched successfully', data: student };
  }

  async update(id: string, updateStudentDto: UpdateStudentDto) {
    const existing = await this.prisma.student.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException(`Student with ID ${id} not found`);
    const updated = await this.prisma.student.update({ where: { id }, data: updateStudentDto });
    return { message: 'Student updated successfully', data: updated };
  }

  async remove(id: string) {
    const existing = await this.prisma.student.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException(`Student with ID ${id} not found`);
    await this.prisma.student.delete({ where: { id } });
    return { message: `Student with ID ${id} deleted successfully` };
  }
}
