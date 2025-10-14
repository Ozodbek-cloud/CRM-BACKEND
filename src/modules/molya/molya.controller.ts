import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MolyaService } from './molya.service';
import { CreateMolyaDto } from './interfaces/create-molya.dto';
import { UpdateMolyaDto } from './interfaces/update-molya.dto';

@Controller('molya')
export class MolyaController {
  constructor(private readonly molyaService: MolyaService) {}

  @Post()
  create(@Body() createMolyaDto: CreateMolyaDto) {
    return this.molyaService.create(createMolyaDto);
  }

  @Get()
  findAll() {
    return this.molyaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.molyaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMolyaDto: UpdateMolyaDto) {
    return this.molyaService.update(+id, updateMolyaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.molyaService.remove(+id);
  }
}
