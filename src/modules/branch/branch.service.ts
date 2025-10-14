import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBranchDto } from './interfaces/create-branch.dto';
import { UpdateBranchDto } from './interfaces/update-branch.dto';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Injectable()
export class BranchService {
  constructor(private prismaService: PrismaService) { }

  async create(createBranch: CreateBranchDto) {
    let data = await this.prismaService.branch.create({
      data: createBranch
    })
    return {
      data: data,
      message: "Successfully Created Branch"
    }
  }

  async findAll() {
    let data = await this.prismaService.branch.findMany({ include: { courses: true, courseCategories: true, students: true } })
    return {
      data: data,
      message: "Successfully All Branch"
    }
  }

  async findOne(id: number) {
    let data = await this.prismaService.branch.findFirst({
      where: {
        id: id
      }
    })
    if (!data) throw new NotFoundException('Id is not found')
    return {
      data: data,
      message: "Successfully One Branch"
    }

  }

  async update(id: number, updateBranch: UpdateBranchDto) {
    let data = await this.prismaService.branch.update({
      where: { id: id },
      data: updateBranch
    });

    if (!data) throw new NotFoundException('Id is not found')
    return {
      data: data,
      message: "Successfully Updated Branch"
    }

  }

  async remove(id: number) {
    let data = await this.prismaService.branch.delete({
      where: {
        id: id
      }
    })
    if (!data) throw new NotFoundException('Id is not found')

    return {
      data: data,
      message: "Successfully Delete Branch"
    }
  }
}
