import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { BranchService } from './branch.service';
import { CreateBranchDto } from './interfaces/create-branch.dto';
import { UpdateBranchDto } from './interfaces/update-branch.dto';

@ApiTags('Branch')
@Controller('branch')
export class BranchController {
  constructor(private readonly branchService: BranchService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create branch' })
  @ApiResponse({ status: 201, description: 'Created successfully' })
  create(@Body() createBranchDto: CreateBranchDto) {
    return this.branchService.create(createBranchDto);
  }

  @Get('all')
  @ApiOperation({ summary: 'Get all branches' })
  @ApiResponse({ status: 200, description: 'Fetched successfully' })
  findAll() {
    return this.branchService.findAll();
  }

  @Get('one/:id')
  @ApiOperation({ summary: 'Get one branch' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, description: 'Fetched successfully' })
  findOne(@Param('id') id: string) {
    return this.branchService.findOne(+id);
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Update branch' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, description: 'Updated successfully' })
  update(@Param('id') id: string, @Body() updateBranchDto: UpdateBranchDto) {
    return this.branchService.update(+id, updateBranchDto);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete branch' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, description: 'Deleted successfully' })
  remove(@Param('id') id: string) {
    return this.branchService.remove(+id);
  }
}
