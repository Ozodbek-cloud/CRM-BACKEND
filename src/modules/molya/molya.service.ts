import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateMoliyaDto } from './interfaces/create-molya.dto';
import { UpdateMolyaDto } from './interfaces/update-molya.dto';

@Injectable()
export class MolyaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMolyaDto: CreateMoliyaDto) {
    try {
      const molya = await this.prisma.moliya.create({
        data: createMolyaDto,
      });

      return {
        message: '✅ Molya successfully created',
        data: molya,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        message: '❌ Failed to create molya',
        error: error.message,
      });
    }
  }

  async findAll() {
    try {
      const molyalar = await this.prisma.moliya.findMany();

      return {
        message: '✅ All molyalar fetched successfully',
        data: molyalar,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        message: '❌ Failed to fetch molyalar',
        error: error.message,
      });
    }
  }

  async findOne(id: string) {
    try {
      const molya = await this.prisma.moliya.findUnique({
        where: { id },
      });

      if (!molya)
        throw new NotFoundException(`Molya with ID ${id} not found`);

      return {
        message: '✅ Molya fetched successfully',
        data: molya,
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      throw new InternalServerErrorException({
        message: '❌ Failed to fetch molya',
        error: error.message,
      });
    }
  }

  async update(id: string, updateMolyaDto: UpdateMolyaDto) {
    try {
      const existing = await this.prisma.moliya.findUnique({ where: { id } });
      if (!existing)
        throw new NotFoundException(`Molya with ID ${id} not found`);

      const updated = await this.prisma.moliya.update({
        where: { id },
        data: updateMolyaDto,
      });

      return {
        message: '✅ Molya updated successfully',
        data: updated,
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      throw new InternalServerErrorException({
        message: '❌ Failed to update molya',
        error: error.message,
      });
    }
  }

  async remove(id: string) {
    try {
      const existing = await this.prisma.moliya.findUnique({ where: { id } });
      if (!existing)
        throw new NotFoundException(`Molya with ID ${id} not found`);

      const deleted = await this.prisma.moliya.delete({ where: { id } });

      return {
        message: `✅ Molya with ID ${id} deleted successfully`,
        data: deleted,
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      throw new InternalServerErrorException({
        message: '❌ Failed to delete molya',
        error: error.message,
      });
    }
  }
}
