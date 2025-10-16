import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CourseCategoryService } from './course-category.service';
import { CreateCourseCategoryDto } from './interfaces/create-course-category.dto';
import { UpdateCourseCategoryDto } from './interfaces/update-course-category.dto';

@ApiTags('Course Category')
@Controller('course-category')
export class CourseCategoryController {
  constructor(private readonly courseCategoryService: CourseCategoryService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create course category' })
  @ApiResponse({ status: 201, description: 'Created successfully' })
  create(@Body() createCourseCategoryDto: CreateCourseCategoryDto) {
    return this.courseCategoryService.create(createCourseCategoryDto);
  }

  @Get('all')
  @ApiOperation({ summary: 'Get all course categories' })
  @ApiResponse({ status: 200, description: 'Fetched successfully' })
  findAll() {
    return this.courseCategoryService.findAll();
  }

  @Get('one/:id')
  @ApiOperation({ summary: 'Get one course category' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, description: 'Fetched successfully' })
  findOne(@Param('id') id: string) {
    return this.courseCategoryService.findOne(+id);
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Update course category' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, description: 'Updated successfully' })
  update(@Param('id') id: string, @Body() updateCourseCategoryDto: UpdateCourseCategoryDto) {
    return this.courseCategoryService.update(+id, updateCourseCategoryDto);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete course category' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, description: 'Deleted successfully' })
  remove(@Param('id') id: string) {
    return this.courseCategoryService.remove(+id);
  }
}
