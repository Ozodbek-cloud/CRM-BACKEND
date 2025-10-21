import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UnsupportedMediaTypeException, UploadedFile } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiConsumes } from '@nestjs/swagger';
import { CourseService } from './course.service';
import { CreateCourseDto } from './interfaces/create-course.dto';
import { UpdateCourseDto } from './interfaces/update-course.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@ApiTags('Course')
@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) { }

  @Post('create')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Create course' })
  @UseInterceptors(FileInterceptor('course_photo', {
    storage: diskStorage({
      destination: "./uploads/course_photo",
      filename: (req, file, cb) => {
        let posterName = file.originalname
        cb(null, posterName)
      }
    }),

    fileFilter: (req, file, callback) => {
      let allowed: string[] = ['image/jpeg', 'image/jpg', 'image/png']
      if (!allowed.includes(file.mimetype)) {
        callback(new UnsupportedMediaTypeException("File tpe must be .jpg | .jpeg | .png "), false)

      }
      callback(null, true)
    }
  }))
  @ApiResponse({ status: 201, description: 'Created successfully' })
  create(@Body() createCourseDto: CreateCourseDto, @UploadedFile() photo: Express.Multer.File) {
    return this.courseService.create(createCourseDto, photo);
  }

  @Get('all')
  @ApiOperation({ summary: 'Get all courses' })
  @ApiResponse({ status: 200, description: 'Fetched successfully' })
  findAll() {
    return this.courseService.findAll();
  }

  @Get('one/:id')
  @ApiOperation({ summary: 'Get one course' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, description: 'Fetched successfully' })
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(+id);
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Update course' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 200, description: 'Updated successfully' })
  @UseInterceptors(FileInterceptor('course_photo', {
    storage: diskStorage({
      destination: "./uploads/course_photo",
      filename: (req, file, cb) => {
        let posterName = file.originalname
        cb(null, posterName)
      }
    }),

    fileFilter: (req, file, callback) => {
      let allowed: string[] = ['image/jpeg', 'image/jpg', 'image/png']
      if (!allowed.includes(file.mimetype)) {
        callback(new UnsupportedMediaTypeException("File tpe must be .jpg | .jpeg | .png "), false)

      }
      callback(null, true)
    }
  }))
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto, photo: Express.Multer.File) {
    return this.courseService.update(+id, updateCourseDto, photo);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete course' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, description: 'Deleted successfully' })
  remove(@Param('id') id: string) {
    return this.courseService.remove(+id);
  }
}
