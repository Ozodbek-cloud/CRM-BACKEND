import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '@prisma/client';

export class CreateStudentDto {
  @ApiProperty({ example: 'Ali Valiyev', description: 'Talaba to‘liq ismi' })
  fullname: string;

  @ApiProperty({ example: 'ali@example.com', description: 'Email manzili' })
  email: string;

  @ApiProperty({ example: 'password123', description: 'Parol' })
  password: string;

  @ApiProperty({ example: '+998901234567', description: 'Telefon raqami'})
  phone: string;

  @ApiProperty({ example: Gender.MALE, enum: Gender, description: 'Jinsi' })
  gander: Gender;

  @ApiProperty({ example: '/uploads/student.jpg', description: 'Talaba rasmi', format: "binary"  })
  student_photo: string;

  @ApiProperty({ example: '2002-05-10', description: 'Tug‘ilgan sana' })
  birthday: Date;

  @ApiProperty({ example: 'ACTIVE', description: 'Talaba holati' })
  status: string;

  @ApiProperty({ example: { hobby: 'Reading' }, description: 'Qo‘shimcha ma’lumotlar (JSON)' })
  other_detailes: object;

  @ApiProperty({ example: 1, description: 'Filial ID' })
  branch_id: number;
}
