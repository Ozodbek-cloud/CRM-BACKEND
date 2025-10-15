import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { UpdateStudentGroupDto } from './interfaces/update-student-group.dto';
import { CreateStudentGroupDto } from './interfaces/create-student-group.dto';

@Injectable()
export class StudentGroupService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createStudentGroupDto: CreateStudentGroupDto) {
    const studentGroup = await this.prisma.studentGroup.create({ data: createStudentGroupDto });
    return { message: 'Student group successfully created', data: studentGroup };
  }

  async findAll() {
    const studentGroups = await this.prisma.studentGroup.findMany();
    return { message: 'All student groups fetched successfully', data: studentGroups };
  }

  async findOne(id: number) {
    const studentGroup = await this.prisma.studentGroup.findUnique({ where: { id } });
    if (!studentGroup) throw new NotFoundException(`Student group with ID ${id} not found`);
    return { message: 'Student group fetched successfully', data: studentGroup };
  }

  async update(id: number, updateStudentGroupDto: UpdateStudentGroupDto) {
    const existing = await this.prisma.studentGroup.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException(`Student group with ID ${id} not found`);
    const updated = await this.prisma.studentGroup.update({ where: { id }, data: updateStudentGroupDto });
    return { message: 'Student group updated successfully', data: updated };
  }

  async remove(id: number) {
    const existing = await this.prisma.studentGroup.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException(`Student group with ID ${id} not found`);
    await this.prisma.studentGroup.delete({ where: { id } });
    return { message: `Student group with ID ${id} deleted successfully` };
  }
}
