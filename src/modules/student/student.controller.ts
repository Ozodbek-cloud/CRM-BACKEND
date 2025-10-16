import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { StudentService } from './student.service';
import { CreateStudentDto } from './interfaces/create-student.dto';
import { UpdateStudentDto } from './interfaces/update-student.dto';

@ApiTags('Student')
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create student' })
  @ApiResponse({ status: 201, description: 'Student created successfully' })
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
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
  @ApiResponse({ status: 200, description: 'Student updated successfully' })
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(id, updateStudentDto);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete student' })
  @ApiParam({ name: 'id', example: '64a1b2c3d4e5f6g7h8i9' })
  @ApiResponse({ status: 200, description: 'Student deleted successfully' })
  remove(@Param('id') id: string) {
    return this.studentService.remove(id);
  }
}
