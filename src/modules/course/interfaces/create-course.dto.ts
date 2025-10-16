import { ApiProperty } from '@nestjs/swagger';

export class CreateCourseDto {
  @ApiProperty({ example: 1, description: 'Filial ID' })
  branch_id: number;

  @ApiProperty({ example: 2, description: 'Kategoriya ID' })
  category_id: number;

  @ApiProperty({ example: 'Frontend Development', description: 'Kurs nomi' })
  name: string;

  @ApiProperty({ example: 'ACTIVE', description: 'Kurs holati' })
  status: string;

  @ApiProperty({ example: 1500000, description: 'Narxi (so‘m)' })
  price: number;

  @ApiProperty({ example: '/uploads/course.jpg', description: 'Kurs rasmi', required: false , format:"binary"})
  course_photo?: string;

  @ApiProperty({ example: 120, description: 'Kurs davomiyligi (soat)' })
  duration_hours: number;

  @ApiProperty({ example: 6, description: 'Kurs davomiyligi (oy)' })
  duration_months: number;

  @ApiProperty({ example: 'Frontend uchun to‘liq dasturlash kursi', description: 'Tavsif' })
  description: string;
}
