import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';

export class CreateUserDto {
  @ApiProperty({ example: 'Ali Valiyev', description: 'Foydalanuvchi ismi' })
  name: string;

  @ApiProperty({ example: 'ali@gmail.com', description: 'Email manzili' })
  email: string;

  @ApiProperty({ example: '+998901112233', description: 'Telefon raqami' })
  phone: string;

  @ApiProperty({ example: 'password123', description: 'Parol' })
  password: string;

  @ApiProperty({ example: '/uploads/photo.jpg', description: 'Rasm manzili', format:"binary" })
  photo: string;

  @ApiProperty({
    example: UserRole.ADMIN,
    enum: UserRole,
    description: 'Foydalanuvchi roli',
  })
  role: UserRole;

  @ApiProperty({ example: 1, description: 'Filial ID' })
  branch_id: number;
}
