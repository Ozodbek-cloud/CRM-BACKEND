import { PartialType } from '@nestjs/swagger';
import { CreateMoliyaDto } from './create-molya.dto';

export class UpdateMolyaDto extends PartialType(CreateMoliyaDto) {}
