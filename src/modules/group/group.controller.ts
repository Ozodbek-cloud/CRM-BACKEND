import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { GroupService } from './group.service';
import { CreateGroupDto } from './interfaces/create-group.dto';
import { UpdateGroupDto } from './interfaces/update-group.dto';

@ApiTags('Group')
@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create group' })
  @ApiResponse({ status: 201, description: 'Created successfully' })
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupService.create(createGroupDto);
  }

  @Get('all')
  @ApiOperation({ summary: 'Get all groups' })
  @ApiResponse({ status: 200, description: 'Fetched successfully' })
  findAll() {
    return this.groupService.findAll();
  }

  @Get('one/:id')
  @ApiOperation({ summary: 'Get one group' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, description: 'Fetched successfully' })
  findOne(@Param('id') id: string) {
    return this.groupService.findOne(+id);
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Update group' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, description: 'Updated successfully' })
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupService.update(+id, updateGroupDto);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete group' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, description: 'Deleted successfully' })
  remove(@Param('id') id: string) {
    return this.groupService.remove(+id);
  }
}
