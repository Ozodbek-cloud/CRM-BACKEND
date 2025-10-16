import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './interfaces/create-student.dto';
import { UpdateStudentDto } from './interfaces/update-student.dto';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Injectable()
export class StudentService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createStudentDto: CreateStudentDto, photo: Express.Multer.File) {
    let file_name = photo.originalname
    const student = await this.prisma.student.create({ data: { ...createStudentDto, student_photo: file_name, branch_id: +createStudentDto.branch_id, birthday: new Date(createStudentDto.birthday) } });
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

  async update(id: string, updateStudentDto: UpdateStudentDto, photo?: Express.Multer.File) {
    const existing = await this.prisma.student.findUnique({ where: { id: id } });
    if (!existing) throw new NotFoundException(`Student with ID ${id} not found`);

    let file_name = existing.student_photo;
    if (photo) {
      file_name = photo.originalname;
    }

    const updated = await this.prisma.student.update({
      where: { id:id },
      data: {
        ...updateStudentDto,
        student_photo: file_name,
        branch_id: Number(updateStudentDto.branch_id),
        birthday: updateStudentDto.birthday ? new Date(updateStudentDto.birthday) : existing.birthday
      },
    });

    return { message: 'Student updated successfully', data: updated };
  }


  async remove(id: string) {
    const existing = await this.prisma.student.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException(`Student with ID ${id} not found`);
    await this.prisma.student.delete({ where: { id } });
    return { message: `Student with ID ${id} deleted successfully` };
  }
}
