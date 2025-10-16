import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '@prisma/client';

export class CreateTeacherDto {
  @ApiProperty({ example: '+998909998877', description: 'Telefon raqami' })
  phone: string;

  @ApiProperty({ example: 'teacher@gmail.com', description: 'Email manzili' })
  email: string;

  @ApiProperty({ example: 'Sardor Karimov', description: 'O‘qituvchi F.I.Sh.' })
  fullname: string;

  @ApiProperty({ example: Gender.MALE, enum: Gender, description: 'Jinsi' })
  gender: Gender;

  @ApiProperty({ example: '/uploads/teacher.jpg', description: 'Rasm manzili', format: "binary" })
  teacher_photo: string;

  @ApiProperty({ example: '1988-05-10', description: 'Tug‘ilgan sana' })
  birthday: Date;

  @ApiProperty({ example: 'teacher123', description: 'Parol' })
  password: string;

  @ApiProperty({ example: 1, description: 'Filial ID' })
  branch_id: number;

  @ApiProperty({ example: 200, description: 'Coin miqdori' })
  coin: number;

  @ApiProperty({ example: 'ACTIVE', description: 'Holat' })
  status: string;

  @ApiProperty({ example: '5 yillik tajriba', description: 'Qo‘shimcha ma’lumot' })
  description: string;
}
