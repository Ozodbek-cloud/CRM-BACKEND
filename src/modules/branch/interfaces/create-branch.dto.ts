import { ApiProperty } from '@nestjs/swagger';
import { BranchStatus } from '@prisma/client';

export class CreateBranchDto {
  @ApiProperty({ example: 'Central Campus', description: 'Filial nomi' })
  name: string;

  @ApiProperty({ example: 'Tashkent', description: 'Hudud nomi' })
  region: string;

  @ApiProperty({ example: 'Yunusabad', description: 'Tuman nomi' })
  district: string;

  @ApiProperty({ example: 'Amir Temur 10A', description: 'Manzil' })
  address: string;

  @ApiProperty({ example: '+998901234567', description: 'Filial telefoni' })
  phone: string;

  @ApiProperty({
    example: BranchStatus.ACTIVE,
    enum: BranchStatus,
    description: 'Filial holati',
  })
  status: BranchStatus;


}
