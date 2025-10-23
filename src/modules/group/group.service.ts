import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateGroupDto } from './interfaces/create-group.dto';
import { UpdateGroupDto } from './interfaces/update-group.dto';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Injectable()
export class GroupService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createGroupDto: CreateGroupDto) {
    try {
      const group = await this.prisma.group.create({
        data: {
          ...createGroupDto,
          start_date: new Date(createGroupDto.start_date),
          end_date: new Date(createGroupDto.end_date),
          start_time: new Date(createGroupDto.start_time),
          branch_id: +createGroupDto.branch_id,
          course_id: +createGroupDto.course_id,
          room_id: +createGroupDto.room_id,
          teacher_id: +createGroupDto.teacher_id,
        },
      });

      return { message: '✅ Group successfully created', data: group };
    } catch (error) {
      throw new InternalServerErrorException({
        message: '❌ Failed to create group',
        error: error.message,
      });
    }
  }

  async findAll() {
    try {
      const groups = await this.prisma.group.findMany({
        include: {
          course: true,
          branch: true,
          teacher: true,
          room: true,
          studentGroups: {include: {student: true}}
        },
      });

      return {
        message: '✅ All groups fetched successfully',
        data: groups,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        message: '❌ Failed to fetch groups',
        error: error.message,
      });
    }
  }

  async findOne(id: number) {
    try {
      const group = await this.prisma.group.findUnique({
        where: { id },
        include: {
          course: true,
          branch: true,
          teacher: true,
          room: true,
        },
      });

      if (!group)
        throw new NotFoundException(`Group with ID ${id} not found`);

      return {
        message: '✅ Group fetched successfully',
        data: group,
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException({
        message: '❌ Failed to fetch group',
        error: error.message,
      });
    }
  }

  async update(id: number, updateGroupDto: UpdateGroupDto) {
    try {
      const existing = await this.prisma.group.findUnique({ where: { id } });
      if (!existing)
        throw new NotFoundException(`Group with ID ${id} not found`);

      const updated = await this.prisma.group.update({
        where: { id },
        data: {
          ...updateGroupDto,
          start_date: updateGroupDto.start_date
            ? new Date(updateGroupDto.start_date)
            : existing.start_date,
          end_date: updateGroupDto.end_date
            ? new Date(updateGroupDto.end_date)
            : existing.end_date,
          start_time: updateGroupDto.start_time
            ? new Date(updateGroupDto.start_time)
            : existing.start_time,
          branch_id: updateGroupDto.branch_id
            ? +updateGroupDto.branch_id
            : existing.branch_id,
          course_id: updateGroupDto.course_id
            ? +updateGroupDto.course_id
            : existing.course_id,
          room_id: updateGroupDto.room_id
            ? +updateGroupDto.room_id
            : existing.room_id,
          teacher_id: updateGroupDto.teacher_id
            ? +updateGroupDto.teacher_id
            : existing.teacher_id,
        },
      });

      return {
        message: '✅ Group updated successfully',
        data: updated,
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException({
        message: '❌ Failed to update group',
        error: error.message,
      });
    }
  }

  async remove(id: number) {
    try {
      const existing = await this.prisma.group.findUnique({ where: { id } });
      if (!existing)
        throw new NotFoundException(`Group with ID ${id} not found`);

      const deleted = await this.prisma.group.delete({ where: { id } });

      return {
        message: `✅ Group with ID ${id} deleted successfully`,
        data: deleted,
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException({
        message: '❌ Failed to delete group',
        error: error.message,
      });
    }
  }
}
