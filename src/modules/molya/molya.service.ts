import { Injectable } from '@nestjs/common';
import { CreateMolyaDto } from './interfaces/create-molya.dto';
import { UpdateMolyaDto } from './interfaces/update-molya.dto';

@Injectable()
export class MolyaService {
  create(createMolyaDto: CreateMolyaDto) {
    return 'This action adds a new molya';
  }

  findAll() {
    return `This action returns all molya`;
  }

  findOne(id: number) {
    return `This action returns a #${id} molya`;
  }

  update(id: number, updateMolyaDto: UpdateMolyaDto) {
    return `This action updates a #${id} molya`;
  }

  remove(id: number) {
    return `This action removes a #${id} molya`;
  }
}
