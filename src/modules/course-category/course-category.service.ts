import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseCategoryDto } from './interfaces/create-course-category.dto';
import { UpdateCourseCategoryDto } from './interfaces/update-course-category.dto';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Injectable()
export class CourseCategoryService {
  constructor(private prismaService: PrismaService) { }

  async create(createCourseCategoryDto: CreateCourseCategoryDto) {
    let data = await this.prismaService.courseCategory.create({
      data: createCourseCategoryDto
    })
    return {
      data: data,
      message: "Successfully Created CourseCategory"
    }
  }

  async findAll() {
    let data = await this.prismaService.courseCategory.findMany({ include: { courses: true } })
    return {
      data: data,
      message: "Successfully Getted all CourseCategory"
    }
  }

  async findOne(id: number) {
    let data = await this.prismaService.courseCategory.findFirst({
      where: {
        id: id
      }
    })
    if (!data) throw new NotFoundException("id is not found")
    return {
      data: data,
      message: "Successfully  Getted one CourseCategory"
    }
  }

  async update(id: number, updateCourseCategoryDto: UpdateCourseCategoryDto) {
    let data = await this.prismaService.courseCategory.update({
      where: {
        id: id
      },
      data: updateCourseCategoryDto
    },
    )
    if (!data) throw new NotFoundException("id is not found")
    return {
      data: data,
      message: "Successfully Updated"
    }

  }

  async remove(id: number) {
    let data = await this.prismaService.courseCategory.delete({
      where: {
        id: id
      }
    })
    if (!data) throw new NotFoundException("id is not found")
    return {
      data: data,
      message: "Successfully Deleted"
    }

  }
}
