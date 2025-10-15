import { Module } from '@nestjs/common';
import { StudentGroupService } from './student-group.service';
import { StudentGroupController } from './student-group.controller';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Module({
  controllers: [StudentGroupController],
  providers: [StudentGroupService, PrismaService],
})
export class StudentGroupModule {}
