import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UnsupportedMediaTypeException, UploadedFile } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiConsumes } from '@nestjs/swagger';
import { StudentService } from './student.service';
import { CreateStudentDto } from './interfaces/create-student.dto';
import { UpdateStudentDto } from './interfaces/update-student.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@ApiTags('Student')
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) { }

  @Post('create')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Create student' })
  @ApiConsumes("multipart/form-data")
  @ApiResponse({ status: 201, description: 'Student created successfully' })
  @UseInterceptors(FileInterceptor('student_photo', {
    storage: diskStorage({
      destination: "./uploads/student_photo",
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
  create(@Body() createStudentDto: CreateStudentDto, @UploadedFile() photo: Express.Multer.File) {
    return this.studentService.create(createStudentDto, photo);
  }

  @Get('all')
  @ApiOperation({ summary: 'Get all students' })
  @ApiResponse({ status: 200, description: 'Students fetched successfully' })
  findAll() {
    return this.studentService.findAll();
  }

  @Get('one/:id')
  @ApiOperation({ summary: 'Get one student by ID' })
  @ApiParam({ name: 'id', example: '64a1b2c3d4e5f6g7h8i9' })
  @ApiResponse({ status: 200, description: 'Student fetched successfully' })
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(id);
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Update student' })
  @ApiParam({ name: 'id', example: '64a1b2c3d4e5f6g7h8i9' })
  @ApiConsumes("multipart/form-data")
  @ApiResponse({ status: 200, description: 'Student updated successfully' })
  @UseInterceptors(FileInterceptor('student_photo', {
    storage: diskStorage({
      destination: "./uploads/student_photo",
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
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto, @UploadedFile() photo: Express.Multer.File) {
    return this.studentService.update(id, updateStudentDto, photo);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete student' })
  @ApiParam({ name: 'id', example: '64a1b2c3d4e5f6g7h8i9' })
  @ApiResponse({ status: 200, description: 'Student deleted successfully' })
  remove(@Param('id') id: string) {
    return this.studentService.remove(id);
  }
}
