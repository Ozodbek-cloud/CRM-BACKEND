import { Module } from '@nestjs/common';
import { HisobotlarService } from './hisobotlar.service';
import { HisobotlarController } from './hisobotlar.controller';

@Module({
  controllers: [HisobotlarController],
  providers: [HisobotlarService],
})
export class HisobotlarModule {}
