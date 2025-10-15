import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGroupDto } from './interfaces/create-group.dto';
import { UpdateGroupDto } from './interfaces/update-group.dto';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Injectable()
export class GroupService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createGroupDto: CreateGroupDto) {
    const group = await this.prisma.group.create({ data: createGroupDto });
    return { message: 'Group successfully created', data: group };
  }

  async findAll() {
    const groups = await this.prisma.group.findMany();
    return { message: 'All groups fetched successfully', data: groups };
  }

  async findOne(id: number) {
    const group = await this.prisma.group.findUnique({ where: { id } });
    if (!group) throw new NotFoundException(`Group with ID ${id} not found`);
    return { message: 'Group fetched successfully', data: group };
  }

  async update(id: number, updateGroupDto: UpdateGroupDto) {
    const existing = await this.prisma.group.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException(`Group with ID ${id} not found`);
    const updated = await this.prisma.group.update({ where: { id }, data: updateGroupDto });
    return { message: 'Group updated successfully', data: updated };
  }

  async remove(id: number) {
    const existing = await this.prisma.group.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException(`Group with ID ${id} not found`);
    await this.prisma.group.delete({ where: { id } });
    return { message: `Group with ID ${id} deleted successfully` };
  }
}
