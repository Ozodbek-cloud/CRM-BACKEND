import { Module } from '@nestjs/common';
import { MolyaService } from './molya.service';
import { MolyaController } from './molya.controller';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Module({
  controllers: [MolyaController],
  providers: [MolyaService, PrismaService],
})
export class MolyaModule {}
