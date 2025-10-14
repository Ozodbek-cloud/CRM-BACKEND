import { Injectable } from '@nestjs/common';
import { CreateHisobotlarDto } from './interfaces/create-hisobotlar.dto';
import { UpdateHisobotlarDto } from './interfaces/update-hisobotlar.dto';

@Injectable()
export class HisobotlarService {
  create(createHisobotlarDto: CreateHisobotlarDto) {
    return 'This action adds a new hisobotlar';
  }

  findAll() {
    return `This action returns all hisobotlar`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hisobotlar`;
  }

  update(id: number, updateHisobotlarDto: UpdateHisobotlarDto) {
    return `This action updates a #${id} hisobotlar`;
  }

  remove(id: number) {
    return `This action removes a #${id} hisobotlar`;
  }
}
