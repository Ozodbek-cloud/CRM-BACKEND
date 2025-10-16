import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './interfaces/create-course.dto';
import { UpdateCourseDto } from './interfaces/update-course.dto';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Injectable()
export class CourseService {
  constructor(private prismaService: PrismaService) { }

  async create(createCourseDto: CreateCourseDto, photo: Express.Multer.File) {
    const file_name = photo.originalname;

    const data = await this.prismaService.course.create({
      data: {
        ...createCourseDto,
        duration_hours: +createCourseDto.duration_hours,
        duration_months: +createCourseDto.duration_months,
        price: +createCourseDto.price,
        branch_id: +createCourseDto.branch_id,
        category_id: +createCourseDto.category_id,
        course_photo: file_name,
      },
    });

    return {
      message: 'Successfully Created Course',
      data,
    };
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

  async update(id: number, updateCourseDto: UpdateCourseDto, photo: Express.Multer.File) {
    const existing = await this.prismaService.course.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException(`User with ID ${id} not found`);

    let file_name = existing.course_photo;
    if (photo) {
      file_name = photo.originalname;
    }

    let updated_data = await this.prismaService.course.update({
      where: {
        id: id
      },
      data: {
        ...updateCourseDto,
        duration_hours: Number(updateCourseDto.duration_hours),
        duration_months: Number(updateCourseDto.duration_months),
        price: Number(updateCourseDto.price),
        branch_id: Number(updateCourseDto.branch_id),
        category_id: Number(updateCourseDto.category_id),
        course_photo: file_name,
      }
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
