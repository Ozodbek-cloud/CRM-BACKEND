import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateMolyaDto } from './interfaces/update-molya.dto';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateMoliyaDto } from './interfaces/create-molya.dto';

@Injectable()
export class MolyaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMolyaDto: CreateMoliyaDto) {
    const molya = await this.prisma.moliya.create({ data: createMolyaDto });
    return { message: 'Molya successfully created', data: molya };
  }

  async findAll() {
    const molyalar = await this.prisma.moliya.findMany();
    return { message: 'All molyalar fetched successfully', data: molyalar };
  }

  async findOne(id: string) {
    const molya = await this.prisma.moliya.findUnique({ where: { id } });
    if (!molya) throw new NotFoundException(`Molya with ID ${id} not found`);
    return { message: 'Molya fetched successfully', data: molya };
  }

  async update(id: string, updateMolyaDto: UpdateMolyaDto) {
    const existing = await this.prisma.moliya.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException(`Molya with ID ${id} not found`);
    const updated = await this.prisma.moliya.update({ where: { id }, data: updateMolyaDto });
    return { message: 'Molya updated successfully', data: updated };
  }

  async remove(id: string) {
    const existing = await this.prisma.moliya.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException(`Molya with ID ${id} not found`);
    await this.prisma.moliya.delete({ where: { id } });
    return { message: `Molya with ID ${id} deleted successfully` };
  }
}
