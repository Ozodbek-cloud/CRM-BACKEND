import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoomDto } from './interfaces/create-room.dto';
import { UpdateRoomDto } from './interfaces/update-room.dto';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Injectable()
export class RoomService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRoomDto: CreateRoomDto) {
    const room = await this.prisma.room.create({ data: createRoomDto });
    return { message: 'Room successfully created', data: room };
  }

  async findAll() {
    const rooms = await this.prisma.room.findMany();
    return { message: 'All rooms fetched successfully', data: rooms };
  }

  async findOne(id: number) {
    const room = await this.prisma.room.findUnique({ where: { id } });
    if (!room) throw new NotFoundException(`Room with ID ${id} not found`);
    return { message: 'Room fetched successfully', data: room };
  }

  async update(id: number, updateRoomDto: UpdateRoomDto) {
    const existing = await this.prisma.room.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException(`Room with ID ${id} not found`);
    const updated = await this.prisma.room.update({ where: { id }, data: updateRoomDto });
    return { message: 'Room updated successfully', data: updated };
  }

  async remove(id: number) {
    const existing = await this.prisma.room.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException(`Room with ID ${id} not found`);
    await this.prisma.room.delete({ where: { id } });
    return { message: `Room with ID ${id} deleted successfully` };
  }
}
