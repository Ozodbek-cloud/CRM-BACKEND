import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './interfaces/create-course.dto';
import { UpdateCourseDto } from './interfaces/update-course.dto';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Injectable()
export class CourseService {
  constructor(private prismaService: PrismaService) { }

  async create(createCourseDto: CreateCourseDto) {
    let data = await this.prismaService.course.create({
      data: createCourseDto
    })
    return {
      data: data,
      message: "Successfully Created Course"
    }
  }

  async findAll() {
    let data = await this.prismaService.course.findMany({ include: { category: true } })
    return {
      data: data,
      message: "Successfully Getted All Courses"
    }
  }

  async findOne(id: number) {
    let data = await this.prismaService.course.findFirst({
      where: {
        id: id
      }
    })
    if (!data) throw new NotFoundException("id is not found")
    return {
      data: data,
      message: "Successfully Getted One Course"
    }
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    let updated_data = await this.prismaService.course.update({
      where: {
        id: id
      },
      data: updateCourseDto
    })
    return {
      data: updated_data,
      message: "Successfully Updated Course"
    }
  }

  async remove(id: number) {
    let data = await this.prismaService.course.delete({
      where: {
        id: id
      }
    })
    if (!data) throw new NotFoundException("id is not found")
    return {
      data: data,
      message: "Successfully Deleted One Course"
    }
  }
}
