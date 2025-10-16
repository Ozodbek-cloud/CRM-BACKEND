import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { StudentGroupService } from './student-group.service';
import { CreateStudentGroupDto } from './interfaces/create-student-group.dto';
import { UpdateStudentGroupDto } from './interfaces/update-student-group.dto';

@ApiTags('Student Group')
@Controller('student-group')
export class StudentGroupController {
  constructor(private readonly studentGroupService: StudentGroupService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create student group' })
  @ApiResponse({ status: 201, description: 'Student group created successfully' })
  create(@Body() createStudentGroupDto: CreateStudentGroupDto) {
    return this.studentGroupService.create(createStudentGroupDto);
  }

  @Get('all')
  @ApiOperation({ summary: 'Get all student groups' })
  @ApiResponse({ status: 200, description: 'Student groups fetched successfully' })
  findAll() {
    return this.studentGroupService.findAll();
  }

  @Get('one/:id')
  @ApiOperation({ summary: 'Get one student group by ID' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, description: 'Student group fetched successfully' })
  findOne(@Param('id') id: string) {
    return this.studentGroupService.findOne(+id);
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Update student group' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, description: 'Student group updated successfully' })
  update(@Param('id') id: string, @Body() updateStudentGroupDto: UpdateStudentGroupDto) {
    return this.studentGroupService.update(+id, updateStudentGroupDto);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete student group' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, description: 'Student group deleted successfully' })
  remove(@Param('id') id: string) {
    return this.studentGroupService.remove(+id);
  }
}
