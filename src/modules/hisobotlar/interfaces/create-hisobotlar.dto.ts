import { ApiProperty } from '@nestjs/swagger';

export class CreateHisobotlarDto {
  @ApiProperty({ example: '2025-10-01', description: 'Sana' })
  data: Date;

  @ApiProperty({ example: 'October', description: 'Oy nomi' })
  month: string;

  @ApiProperty({ example: 25000000, description: 'Summasi' })
  summa: number;
}
