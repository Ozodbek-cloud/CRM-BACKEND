import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HisobotlarService } from './hisobotlar.service';
import { CreateHisobotlarDto } from './interfaces/create-hisobotlar.dto';
import { UpdateHisobotlarDto } from './interfaces/update-hisobotlar.dto';

@Controller('hisobotlar')
export class HisobotlarController {
  constructor(private readonly hisobotlarService: HisobotlarService) {}

  @Post()
  create(@Body() createHisobotlarDto: CreateHisobotlarDto) {
    return this.hisobotlarService.create(createHisobotlarDto);
  }

  @Get()
  findAll() {
    return this.hisobotlarService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hisobotlarService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHisobotlarDto: UpdateHisobotlarDto) {
    return this.hisobotlarService.update(+id, updateHisobotlarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hisobotlarService.remove(+id);
  }
}
