import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiConsumes } from '@nestjs/swagger';
import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from './interfaces/create-teacher.dto';
import { UpdateTeacherDto } from './interfaces/update-teacher.dto';

@ApiTags('Teacher')
@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Post('create')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Create teacher' })
  @ApiResponse({ status: 201, description: 'Teacher created successfully' })
  create(@Body() createTeacherDto: CreateTeacherDto) {
    return this.teacherService.create(createTeacherDto);
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
  @ApiResponse({ status: 200, description: 'Teacher updated successfully' })
  update(@Param('id') id: string, @Body() updateTeacherDto: UpdateTeacherDto) {
    return this.teacherService.update(+id, updateTeacherDto);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete teacher by ID' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, description: 'Teacher deleted successfully' })
  remove(@Param('id') id: string) {
    return this.teacherService.remove(+id);
  }
}
