import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateStudentGroupDto } from './interfaces/create-student-group.dto';
import { UpdateStudentGroupDto } from './interfaces/update-student-group.dto';

@Injectable()
export class StudentGroupService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createStudentGroupDto: CreateStudentGroupDto) {
    try {
      const studentGroup = await this.prisma.studentGroup.create({
        data: createStudentGroupDto,
      });

      return {
        message: '✅ Student group successfully created',
        data: studentGroup,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        message: '❌ Failed to create student group',
        error: error.message,
      });
    }
  }

  async findAll() {
    try {
      const studentGroups = await this.prisma.studentGroup.findMany();

      return {
        message: '✅ All student groups fetched successfully',
        data: studentGroups,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        message: '❌ Failed to fetch student groups',
        error: error.message,
      });
    }
  }

  async findOne(id: number) {
    try {
      const studentGroup = await this.prisma.studentGroup.findUnique({
        where: { id },
      });

      if (!studentGroup)
        throw new NotFoundException(`Student group with ID ${id} not found`);

      return {
        message: '✅ Student group fetched successfully',
        data: studentGroup,
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      throw new InternalServerErrorException({
        message: '❌ Failed to fetch student group',
        error: error.message,
      });
    }
  }

  async update(id: number, updateStudentGroupDto: UpdateStudentGroupDto) {
    try {
      const existing = await this.prisma.studentGroup.findUnique({
        where: { id },
      });

      if (!existing)
        throw new NotFoundException(`Student group with ID ${id} not found`);

      const updated = await this.prisma.studentGroup.update({
        where: { id },
        data: updateStudentGroupDto,
      });

      return {
        message: '✅ Student group updated successfully',
        data: updated,
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      throw new InternalServerErrorException({
        message: '❌ Failed to update student group',
        error: error.message,
      });
    }
  }

  async remove(id: number) {
    try {
      const existing = await this.prisma.studentGroup.findUnique({
        where: { id },
      });

      if (!existing)
        throw new NotFoundException(`Student group with ID ${id} not found`);

      const deleted = await this.prisma.studentGroup.delete({ where: { id } });

      return {
        message: `✅ Student group with ID ${id} deleted successfully`,
        data: deleted,
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      throw new InternalServerErrorException({
        message: '❌ Failed to delete student group',
        error: error.message,
      });
    }
  }
}
