import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { HisobotlarService } from './hisobotlar.service';
import { CreateHisobotlarDto } from './interfaces/create-hisobotlar.dto';
import { UpdateHisobotlarDto } from './interfaces/update-hisobotlar.dto';

@ApiTags('Hisobotlar')
@Controller('hisobotlar')
export class HisobotlarController {
  constructor(private readonly hisobotlarService: HisobotlarService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create hisobot' })
  @ApiResponse({ status: 201, description: 'Created successfully' })
  create(@Body() createHisobotlarDto: CreateHisobotlarDto) {
    return this.hisobotlarService.create(createHisobotlarDto);
  }

  @Get('all')
  @ApiOperation({ summary: 'Get all hisobotlar' })
  @ApiResponse({ status: 200, description: 'Fetched successfully' })
  findAll() {
    return this.hisobotlarService.findAll();
  }

  @Get('one/:id')
  @ApiOperation({ summary: 'Get one hisobot' })
  @ApiParam({ name: 'id', example: 'uuid-or-id' })
  @ApiResponse({ status: 200, description: 'Fetched successfully' })
  findOne(@Param('id') id: string) {
    return this.hisobotlarService.findOne(id);
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Update hisobot' })
  @ApiParam({ name: 'id', example: 'uuid-or-id' })
  @ApiResponse({ status: 200, description: 'Updated successfully' })
  update(@Param('id') id: string, @Body() updateHisobotlarDto: UpdateHisobotlarDto) {
    return this.hisobotlarService.update(id, updateHisobotlarDto);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete hisobot' })
  @ApiParam({ name: 'id', example: 'uuid-or-id' })
  @ApiResponse({ status: 200, description: 'Deleted successfully' })
  remove(@Param('id') id: string) {
    return this.hisobotlarService.remove(id);
  }
}
