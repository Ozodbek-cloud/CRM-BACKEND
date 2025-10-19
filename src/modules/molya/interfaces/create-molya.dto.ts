import { ApiProperty } from '@nestjs/swagger';

export class CreateMoliyaDto {
  @ApiProperty({ example: 'INV-001', description: 'Hisob-faktura raqami' })
  invoice: string;

  @ApiProperty({ example: "5000000", description: 'Jami kirim' })
  All_Kirim: string;

  @ApiProperty({ example: "2000000", description: 'Jami chiqim' })
  All_Chiqim: string;

  @ApiProperty({ example: "3000000", description: 'Foyda' })
  foyda: string;

  @ApiProperty({ example: 75.5, description: 'Byudjetdan foydalanish foizi' })
  using_budjet: number;

  @ApiProperty({ example: 'Tech Supplier', description: 'Ta’minotchi nomi' })
  supllier: string;

  @ApiProperty({ example: "1000000", description: 'Summasi' })
  summa: string;

  @ApiProperty({ example: 'APPROVED', description: 'Holat' })
  status: string;
}
