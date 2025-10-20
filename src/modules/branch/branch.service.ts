import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateBranchDto } from './interfaces/create-branch.dto';
import { UpdateBranchDto } from './interfaces/update-branch.dto';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Injectable()
export class BranchService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createBranch: CreateBranchDto) {
    try {
      const data = await this.prismaService.branch.create({
        data: createBranch,
      });
      return {
        data,
        message: '✅ Successfully Created Branch',
      };
    } catch (error) {
      throw new InternalServerErrorException({
        message: '❌ Failed to create branch',
        error: error.message,
      });
    }
  }

  async findAll() {
    try {
      const data = await this.prismaService.branch.findMany({
        include: {
          courses: true,
          courseCategories: true,
          students: true,
        },
      });
      return {
        data,
        message: '✅ Successfully fetched all branches',
      };
    } catch (error) {
      throw new InternalServerErrorException({
        message: '❌ Failed to fetch branches',
        error: error.message,
      });
    }
  }

  async findOne(id: number) {
    try {
      const data = await this.prismaService.branch.findFirst({
        where: { id },
        include: {
          courses: true,
          courseCategories: true,
          students: true,
        },
      });

      if (!data) {
        throw new NotFoundException(`Branch with ID ${id} not found`);
      }

      return {
        data,
        message: '✅ Successfully fetched one branch',
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException({
        message: '❌ Failed to fetch branch',
        error: error.message,
      });
    }
  }

  async update(id: number, updateBranch: UpdateBranchDto) {
    try {
      const existing = await this.prismaService.branch.findUnique({ where: { id } });
      if (!existing) {
        throw new NotFoundException(`Branch with ID ${id} not found`);
      }

      const data = await this.prismaService.branch.update({
        where: { id },
        data: updateBranch,
      });

      return {
        data,
        message: '✅ Successfully updated branch',
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException({
        message: '❌ Failed to update branch',
        error: error.message,
      });
    }
  }

  async remove(id: number) {
    try {
      const existing = await this.prismaService.branch.findUnique({ where: { id } });
      if (!existing) {
        throw new NotFoundException(`Branch with ID ${id} not found`);
      }

      const data = await this.prismaService.branch.delete({
        where: { id },
      });

      return {
        data,
        message: '✅ Successfully deleted branch',
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException({
        message: '❌ Failed to delete branch',
        error: error.message,
      });
    }
  }
}
