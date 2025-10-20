import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateRoomDto } from './interfaces/create-room.dto';
import { UpdateRoomDto } from './interfaces/update-room.dto';

@Injectable()
export class RoomService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRoomDto: CreateRoomDto) {
    try {
      const room = await this.prisma.room.create({
        data: createRoomDto,
      });

      return {
        message: '✅ Room successfully created',
        data: room,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        message: '❌ Failed to create room',
        error: error.message,
      });
    }
  }

  async findAll() {
    try {
      const rooms = await this.prisma.room.findMany();

      return {
        message: '✅ All rooms fetched successfully',
        data: rooms,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        message: '❌ Failed to fetch rooms',
        error: error.message,
      });
    }
  }

  async findOne(id: number) {
    try {
      const room = await this.prisma.room.findUnique({
        where: { id },
      });

      if (!room)
        throw new NotFoundException(`Room with ID ${id} not found`);

      return {
        message: '✅ Room fetched successfully',
        data: room,
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException({
        message: '❌ Failed to fetch room',
        error: error.message,
      });
    }
  }

  async update(id: number, updateRoomDto: UpdateRoomDto) {
    try {
      const existing = await this.prisma.room.findUnique({
        where: { id },
      });

      if (!existing)
        throw new NotFoundException(`Room with ID ${id} not found`);

      const updated = await this.prisma.room.update({
        where: { id },
        data: updateRoomDto,
      });

      return {
        message: '✅ Room updated successfully',
        data: updated,
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException({
        message: '❌ Failed to update room',
        error: error.message,
      });
    }
  }

  async remove(id: number) {
    try {
      const existing = await this.prisma.room.findUnique({ where: { id } });
      if (!existing)
        throw new NotFoundException(`Room with ID ${id} not found`);

      const deleted = await this.prisma.room.delete({ where: { id } });

      return {
        message: `✅ Room with ID ${id} deleted successfully`,
        data: deleted,
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException({
        message: '❌ Failed to delete room',
        error: error.message,
      });
    }
  }
}
