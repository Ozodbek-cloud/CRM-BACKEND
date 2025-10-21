import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateUserDto } from './interfaces/create-user.dto';
import { UpdateUserDto } from './interfaces/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) { }

  /** CREATE USER */
  async create(createUserDto: CreateUserDto, photo?: Express.Multer.File) {
    const fileName = photo?.originalname || 'default.png';

    const user = await this.prisma.user.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        phone: createUserDto.phone,
        password: createUserDto.password,
        photo: fileName,
        role: createUserDto.role,
        branch_id: Number(createUserDto.branch_id),
      },
    });

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
  
  async update(id: number, updateUserDto: UpdateUserDto, photo?: Express.Multer.File) {
    const existing = await this.prisma.user.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException(`User with ID ${id} not found`);

    const fileName = photo?.originalname || existing.photo;

    const updatedData = {
      name: updateUserDto.name ?? existing.name,
      email: updateUserDto.email ?? existing.email,
      phone: updateUserDto.phone ?? existing.phone,
      password: updateUserDto.password ?? existing.password,
      branch_id: updateUserDto.branch_id
        ? Number(updateUserDto.branch_id)
        : existing.branch_id,
      photo: fileName,
    };

    const updated = await this.prisma.user.update({
      where: { id },
      data: updatedData,
    });

    return { message: 'User updated successfully', data: updated };
  }


  async remove(id: number) {
    const existing = await this.prisma.user.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException(`User with ID ${id} not found`);

    await this.prisma.user.delete({ where: { id } });
    return { message: `User with ID ${id} deleted successfully` };
  }
}
