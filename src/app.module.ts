import { Module } from '@nestjs/common';
import { PrismaModule } from './core/prisma/prisma.module';
import { UsersModule } from './modules/users/users.module';
import { BranchModule } from './modules/branch/branch.module';
import { RoomModule } from './modules/room/room.module';
import { CourseCategoryModule } from './modules/course-category/course-category.module';
import { CourseModule } from './modules/course/course.module';
import { GroupModule } from './modules/group/group.module';
import { StudentModule } from './modules/student/student.module';
import { StudentGroupModule } from './modules/student-group/student-group.module';
import { TeacherModule } from './modules/teacher/teacher.module';
import { MolyaModule } from './modules/molya/molya.module';
import { HisobotlarModule } from './modules/hisobotlar/hisobotlar.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [ServeStaticModule.forRoot(
      {
        rootPath: join(process.cwd(), 'uploads',),
        serveRoot: '/',
      },
    ),

PrismaModule, UsersModule, BranchModule, RoomModule, CourseCategoryModule, CourseModule, GroupModule, StudentModule, StudentGroupModule, TeacherModule, MolyaModule, HisobotlarModule],
})
export class AppModule {}
