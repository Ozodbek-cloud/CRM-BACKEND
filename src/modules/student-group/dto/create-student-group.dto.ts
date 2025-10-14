import { ApiProperty } from '@nestjs/swagger';

export class CreateStudentGroupDto {
  @ApiProperty({ example: 1, description: 'Guruh ID' })
  group_id: number;

  @ApiProperty({ example: 'uuid-string', description: 'Talaba ID (UUID)' })
  student_id: string;

  @ApiProperty({ example: 1, description: 'Filial ID' })
  branch_id: number;
}
