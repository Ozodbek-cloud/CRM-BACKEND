import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CourseService } from './course.service';
import { CreateCourseDto } from './interfaces/create-course.dto';
import { UpdateCourseDto } from './interfaces/update-course.dto';

@ApiTags('Course')
@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create course' })
  @ApiResponse({ status: 201, description: 'Created successfully' })
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.create(createCourseDto);
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
  @ApiResponse({ status: 200, description: 'Updated successfully' })
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(+id, updateCourseDto);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete course' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, description: 'Deleted successfully' })
  remove(@Param('id') id: string) {
    return this.courseService.remove(+id);
  }
}
