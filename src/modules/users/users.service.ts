import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './interfaces/create-user.dto';
import { UpdateUserDto } from './interfaces/update-user.dto';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.prisma.user.create({ data: createUserDto });
    return { message: 'User successfully created', data: user };
  }

  async findAll() {
    const users = await this.prisma.user.findMany();
    return { message: 'All users fetched successfully', data: users };
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);
    return { message: 'User fetched successfully', data: user };
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const existing = await this.prisma.user.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException(`User with ID ${id} not found`);
    const updated = await this.prisma.user.update({ where: { id }, data: updateUserDto });
    return { message: 'User updated successfully', data: updated };
  }

  async remove(id: number) {
    const existing = await this.prisma.user.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException(`User with ID ${id} not found`);
    await this.prisma.user.delete({ where: { id } });
    return { message: `User with ID ${id} deleted successfully` };
  }
}
