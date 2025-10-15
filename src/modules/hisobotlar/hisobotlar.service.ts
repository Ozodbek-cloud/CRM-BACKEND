import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHisobotlarDto } from './interfaces/create-hisobotlar.dto';
import { UpdateHisobotlarDto } from './interfaces/update-hisobotlar.dto';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Injectable()
export class HisobotlarService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createHisobotlarDto: CreateHisobotlarDto) {
    const hisobot = await this.prisma.hisobotlar.create({ data: createHisobotlarDto });
    return { message: 'Hisobot successfully created', data: hisobot };
  }

  async findAll() {
    const hisobotlar = await this.prisma.hisobotlar.findMany();
    return { message: 'All hisobotlar fetched successfully', data: hisobotlar };
  }

  async findOne(id: string) {
    const hisobot = await this.prisma.hisobotlar.findUnique({ where: { id } });
    if (!hisobot) throw new NotFoundException(`Hisobot with ID ${id} not found`);
    return { message: 'Hisobot fetched successfully', data: hisobot };
  }

  async update(id: string, updateHisobotlarDto: UpdateHisobotlarDto) {
    const existing = await this.prisma.hisobotlar.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException(`Hisobot with ID ${id} not found`);
    const updated = await this.prisma.hisobotlar.update({ where: { id }, data: updateHisobotlarDto });
    return { message: 'Hisobot updated successfully', data: updated };
  }

  async remove(id: string) {
    const existing = await this.prisma.hisobotlar.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException(`Hisobot with ID ${id} not found`);
    await this.prisma.hisobotlar.delete({ where: { id } });
    return { message: `Hisobot with ID ${id} deleted successfully` };
  }
}
