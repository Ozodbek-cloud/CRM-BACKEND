import { Module } from '@nestjs/common';
import { MolyaService } from './molya.service';
import { MolyaController } from './molya.controller';

@Module({
  controllers: [MolyaController],
  providers: [MolyaService],
})
export class MolyaModule {}
