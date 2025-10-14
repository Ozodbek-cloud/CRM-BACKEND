import { ApiProperty } from '@nestjs/swagger';

export class CreateCourseCategoryDto {
  @ApiProperty({ example: 'IT & Programming', description: 'Kurs kategoriyasi nomi' })
  name: string;

  @ApiProperty({ example: 1, description: 'Filial ID' })
  branch_id: number;
}
