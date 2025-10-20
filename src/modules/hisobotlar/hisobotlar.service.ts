import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateHisobotlarDto } from './interfaces/create-hisobotlar.dto';
import { UpdateHisobotlarDto } from './interfaces/update-hisobotlar.dto';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Injectable()
export class HisobotlarService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createHisobotlarDto: CreateHisobotlarDto) {
    try {
      const hisobot = await this.prisma.hisobotlar.create({
        data: {
          ...createHisobotlarDto,
          data: new Date(createHisobotlarDto.data),
        },
      });

      return {
        message: '✅ Hisobot successfully created',
        data: hisobot,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        message: '❌ Failed to create hisobot',
        error: error.message,
      });
    }
  }

  async findAll() {
    try {
      const hisobotlar = await this.prisma.hisobotlar.findMany();

      return {
        message: '✅ All hisobotlar fetched successfully',
        data: hisobotlar,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        message: '❌ Failed to fetch hisobotlar',
        error: error.message,
      });
    }
  }

  async findOne(id: string) {
    try {
      const hisobot = await this.prisma.hisobotlar.findUnique({
        where: { id },
      });

      if (!hisobot) {
        throw new NotFoundException(`Hisobot with ID ${id} not found`);
      }

      return {
        message: '✅ Hisobot fetched successfully',
        data: hisobot,
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException({
        message: '❌ Failed to fetch hisobot',
        error: error.message,
      });
    }
  }

  async update(id: string, updateHisobotlarDto: UpdateHisobotlarDto) {
    try {
      const existing = await this.prisma.hisobotlar.findUnique({ where: { id } });
      if (!existing)
        throw new NotFoundException(`Hisobot with ID ${id} not found`);

      const updated = await this.prisma.hisobotlar.update({
        where: { id },
        data: {
          ...updateHisobotlarDto,
          data: updateHisobotlarDto.data
            ? new Date(updateHisobotlarDto.data)
            : existing.data,
        },
      });

      return {
        message: '✅ Hisobot updated successfully',
        data: updated,
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException({
        message: '❌ Failed to update hisobot',
        error: error.message,
      });
    }
  }

  async remove(id: string) {
    try {
      const existing = await this.prisma.hisobotlar.findUnique({ where: { id } });
      if (!existing)
        throw new NotFoundException(`Hisobot with ID ${id} not found`);

      const deleted = await this.prisma.hisobotlar.delete({ where: { id } });

      return {
        message: `✅ Hisobot with ID ${id} deleted successfully`,
        data: deleted,
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException({
        message: '❌ Failed to delete hisobot',
        error: error.message,
      });
    }
  }
}
