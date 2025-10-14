import { ApiProperty } from '@nestjs/swagger';

export class CreateRoomDto {
  @ApiProperty({ example: 1, description: 'Filial ID' })
  branch_id: number;

  @ApiProperty({ example: 'Room A1', description: 'Xona nomi' })
  name: string;

  @ApiProperty({ example: 20, description: 'Xona sig‘imi' })
  capacity: number;
}
