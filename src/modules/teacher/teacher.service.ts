import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateTeacherDto } from './interfaces/create-teacher.dto';
import { UpdateTeacherDto } from './interfaces/update-teacher.dto';

@Injectable()
export class TeacherService {
  constructor(private readonly prisma: PrismaService) {}

  /** CREATE */
  async create(createTeacherDto: CreateTeacherDto, photo: Express.Multer.File) {
    const fileName = photo?.originalname || 'default.png';

    const teacher = await this.prisma.teacher.create({
      data: {
        ...createTeacherDto,
        teacher_photo: fileName,
        branch_id: Number(createTeacherDto.branch_id),
        coin: Number(createTeacherDto.coin),
        birthday: new Date(createTeacherDto.birthday),
      },
    });

    return { message: 'Teacher successfully created', data: teacher };
  }

  /** FIND ALL */
  async findAll() {
    const teachers = await this.prisma.teacher.findMany();
    return { message: 'All teachers fetched successfully', data: teachers };
  }

  /** FIND ONE */
  async findOne(id: number) {
    const teacher = await this.prisma.teacher.findUnique({ where: { id } });
    if (!teacher) throw new NotFoundException(`Teacher with ID ${id} not found`);
    return { message: 'Teacher fetched successfully', data: teacher };
  }

  /** UPDATE */
  async update(id: number, updateTeacherDto: UpdateTeacherDto, photo?: Express.Multer.File) {
    const existing = await this.prisma.teacher.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException(`Teacher with ID ${id} not found`);

    const fileName = photo?.originalname || existing.teacher_photo;

    const updated = await this.prisma.teacher.update({
      where: { id },
      data: {
        ...updateTeacherDto,
        teacher_photo: fileName,
        branch_id: Number(updateTeacherDto.branch_id ?? existing.branch_id),
        coin: Number(updateTeacherDto.coin ?? existing.coin),
        birthday: updateTeacherDto.birthday
          ? new Date(updateTeacherDto.birthday)
          : existing.birthday,
      },
    });

    return { message: 'Teacher updated successfully', data: updated };
  }

  /** DELETE */
  async remove(id: number) {
    const existing = await this.prisma.teacher.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException(`Teacher with ID ${id} not found`);

    await this.prisma.teacher.delete({ where: { id } });
    return { message: `Teacher with ID ${id} deleted successfully` };
  }
}
