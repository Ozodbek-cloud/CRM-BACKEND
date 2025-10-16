import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { MolyaService } from './molya.service';
import { CreateMoliyaDto } from './interfaces/create-molya.dto';
import { UpdateMolyaDto } from './interfaces/update-molya.dto';

@ApiTags('Molya')
@Controller('molya')
export class MolyaController {
  constructor(private readonly molyaService: MolyaService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create molya' })
  @ApiResponse({ status: 201, description: 'Created successfully' })
  create(@Body() createMolyaDto: CreateMoliyaDto) {
    return this.molyaService.create(createMolyaDto);
  }

  @Get('all')
  @ApiOperation({ summary: 'Get all molya records' })
  @ApiResponse({ status: 200, description: 'Fetched successfully' })
  findAll() {
    return this.molyaService.findAll();
  }

  @Get('one/:id')
  @ApiOperation({ summary: 'Get one molya record' })
  @ApiParam({ name: 'id', example: 'uuid-or-id' })
  @ApiResponse({ status: 200, description: 'Fetched successfully' })
  findOne(@Param('id') id: string) {
    return this.molyaService.findOne(id);
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Update molya record' })
  @ApiParam({ name: 'id', example: 'uuid-or-id' })
  @ApiResponse({ status: 200, description: 'Updated successfully' })
  update(@Param('id') id: string, @Body() updateMolyaDto: UpdateMolyaDto) {
    return this.molyaService.update(id, updateMolyaDto);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete molya record' })
  @ApiParam({ name: 'id', example: 'uuid-or-id' })
  @ApiResponse({ status: 200, description: 'Deleted successfully' })
  remove(@Param('id') id: string) {
    return this.molyaService.remove(id);
  }
}
