import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UnsupportedMediaTypeException, UploadedFile } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiConsumes } from '@nestjs/swagger';
import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from './interfaces/create-teacher.dto';
import { UpdateTeacherDto } from './interfaces/update-teacher.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@ApiTags('Teacher')
@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) { }

  @Post('create')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Create teacher' })
  @ApiConsumes("multipart/form-data")
  @ApiResponse({ status: 201, description: 'Teacher created successfully' })
  @UseInterceptors(FileInterceptor('teacher_photo', {
    storage: diskStorage({
      destination: "./uploads/teacher_photo",
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
  create(@Body() createTeacherDto: CreateTeacherDto, @UploadedFile() photo: Express.Multer.File) {
    return this.teacherService.create(createTeacherDto, photo);
  }

  @Get('all')
  @ApiOperation({ summary: 'Get all teachers' })
  @ApiResponse({ status: 200, description: 'Teachers fetched successfully' })
  findAll() {
    return this.teacherService.findAll();
  }

  @Get('one/:id')
  @ApiOperation({ summary: 'Get teacher by ID' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, description: 'Teacher fetched successfully' })
  findOne(@Param('id') id: string) {
    return this.teacherService.findOne(+id);
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Update teacher by ID' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiConsumes("multipart/form-data")
  @ApiResponse({ status: 200, description: 'Teacher updated successfully' })
  @UseInterceptors(FileInterceptor('teacher_photo', {
    storage: diskStorage({
      destination: "./uploads/teacher_photo",
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
  update(@Param('id') id: string, @Body() updateTeacherDto: UpdateTeacherDto, @UploadedFile() photo: Express.Multer.File) {
    return this.teacherService.update(+id, updateTeacherDto, photo);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete teacher by ID' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, description: 'Teacher deleted successfully' })
  remove(@Param('id') id: string) {
    return this.teacherService.remove(+id);
  }
}
