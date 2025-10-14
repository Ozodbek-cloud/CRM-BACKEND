import { ApiProperty } from '@nestjs/swagger';

export class CreateGroupDto {
  @ApiProperty({ example: 'Frontend Evening', description: 'Guruh nomi' })
  name: string;

  @ApiProperty({ example: 1, description: 'Kurs ID' })
  course_id: number;

  @ApiProperty({ example: 2, description: 'Xona ID' })
  room_id: number;

  @ApiProperty({ example: 3, description: 'O‘qituvchi ID' })
  teacher_id: number;

  @ApiProperty({ example: 'ACTIVE', description: 'Guruh holati' })
  status: string;

  @ApiProperty({ example: ['Monday', 'Wednesday', 'Friday'], description: 'Dars kunlari' })
  days: string[];

  @ApiProperty({ example: '2025-10-01T18:00:00Z', description: 'Boshlanish vaqti' })
  start_time: Date;

  @ApiProperty({ example: '2025-10-01', description: 'Boshlanish sanasi' })
  start_date: Date;

  @ApiProperty({ example: '2026-04-01', description: 'Tugash sanasi' })
  end_date: Date;

  @ApiProperty({ example: 1, description: 'Filial ID' })
  branch_id: number;
}
