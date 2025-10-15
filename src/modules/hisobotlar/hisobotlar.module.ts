import { Module } from '@nestjs/common';
import { HisobotlarService } from './hisobotlar.service';
import { HisobotlarController } from './hisobotlar.controller';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Module({
  controllers: [HisobotlarController],
  providers: [HisobotlarService, PrismaService],
})
export class HisobotlarModule {}
